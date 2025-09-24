import React, { useRef } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { DateRangeField } from "@/components/ui/date-range";
import { ExportSelector } from "@/components/datatable/ExportSelector";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { earningsColumns } from "./EarningsColumns";
import { useGetAllEarnings } from "@/queries/earnings";
// columns will be defined inside the component so we can use `useNavigate` for actions
const EarningsPage = () => {
  const navigate = useNavigate();
  // Date range state for the DateRangeField (default Jan 01, 2024 - Dec 31, 2024)
  const [dateRange, setDateRange] = React.useState({
    from: null,
    to: null,
  });
  const [sourceFilter, setSourceFilter] = React.useState("all");
  const [periodFilter, setPeriodFilter] = React.useState("yearly");
  const tableRef = useRef(null);

  // use project's shared query hook
  const {
    data: apiRes = { items: [], count: 0 },
    isLoading,
    error,
  } = useGetAllEarnings();
  // map items from the query select into the table rows expected by the table
  const tableData = (apiRes.items || []).map((item) => {
    const iso = item.CreateAt || item.createdAt || item.CreateAt;
    const dt = iso ? new Date(iso) : null;
    const formatDate = (d) => {
      if (!d || Number.isNaN(d.getTime())) return "";
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    const amt =
      item.Transaction_id && typeof item.Transaction_id.Amount !== "undefined"
        ? Number(item.Transaction_id.Amount)
        : item.Amount || 0;

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amt);

    return {
      date: formatDate(dt),
      buyer: item.Buyer?.Name || item.Buyer?.name || "-",
      seller: item.seller?.Name || item.seller?.name || "-",
      amount: formattedAmount,
      source: item.source || item.Source || "N/A",
      payment: item.payment || item.Payment || "Online",
      transaction:
        (item.Transaction_id && item.Transaction_id.Transaction_id) ||
        item.Transaction_id?.TransactionId ||
        item.Transaction_id?.id ||
        item._id ||
        "",
      status: item.Transaction_status || item.Status || "N/A",
      originalApi: item,
    };
  });
  // Compute total earnings: parse amount strings like "$660,000" into numbers and sum
  const parseAmount = (amt) => {
    if (!amt) return 0;
    // remove any non-digit, non-dot characters (like $ and ,)
    const cleaned = String(amt).replace(/[^0-9.\-]/g, "");
    const n = parseFloat(cleaned);
    return Number.isNaN(n) ? 0 : n;
  };

  // Apply filters to the data
  const filteredData = (tableData || []).filter((row) => {
    // source filter
    if (sourceFilter && sourceFilter !== "all") {
      if (row.source !== sourceFilter) return false;
    }

    // period filter (simple demo implementation: yearly/monthly/weekly)
    // For demo: keep all rows for yearly, filter by month for monthly, by range for weekly.
    if (periodFilter === "monthly") {
      // assume monthly = June (06) for demo (since sample data mostly in June)
      return /\/06\//.test(row.date);
    }
    if (periodFilter === "weekly") {
      // demo: pick dates between 10/06 and 20/06
      const parts = row.date.split("/");
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      if (month === 6 && day >= 10 && day <= 20) return true;
      return false;
    }

    return true;
  });

  // compute total from table if available (table filters will reflect Selects)
  let totalEarningsNumber = filteredData.reduce((sum, row) => {
    return sum + parseAmount(row.amount);
  }, 0);
  const table = tableRef?.current;
  if (table && typeof table.getRowModel === "function") {
    const rows = table.getRowModel().flatRows;
    totalEarningsNumber = rows.reduce(
      (s, r) => s + parseAmount(r.original.amount),
      0
    );
  }

  // Format as currency, e.g., $1,234,567.00
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalEarningsNumber);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        {/* Top row (Earning + Filters all in one row) */}
        <div className="flex flex-col lg:flex-row lg:items-center  gap-4">
          <h2 className="text-xl font-semibold">Earning</h2>

          <div className="flex flex-wrap  items-center gap-3">
            <div className="border shadow-md ml-4 border-gray-300 bg-white text-primary font-semibold text-sm px-4 py-2 rounded-md">
              Total Earnings:{" "}
              <span className="text-primary">{formattedTotal}</span>
            </div>

            {/* Date range picker */}
            <div className="ml-2">
              <DateRangeField
                value={dateRange}
                onChange={(v) => {
                  setDateRange(v);
                  // future: wire this to table filters if desired
                }}
                className="rounded-md"
              />
            </div>

            <Select
              value={sourceFilter}
              onValueChange={(val) => {
                const v = val || "all";
                setSourceFilter(v);
                const table = tableRef.current;
                if (table && typeof table.setColumnFilters === "function") {
                  const filters = [];
                  if (v && v !== "all")
                    filters.push({ id: "source", value: v });
                  if (periodFilter)
                    filters.push({ id: "date", value: periodFilter });
                  table.setColumnFilters(filters);
                }
              }}
            >
              <SelectTrigger className="rounded-md">
                <SelectValue placeholder="Earnings From" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Source</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="subscription">subscription</SelectItem>
                  <SelectItem value="adds">Adds</SelectItem>
                  <SelectItem value="listing-boost">
                    Listing boost by seller
                  </SelectItem>
                  <SelectItem value="boost-by-loan-providers">
                    Boost by loan providers
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <ExportSelector />

            <Select
              value={periodFilter}
              onValueChange={(val) => {
                const v = val || "yearly";
                setPeriodFilter(v);
                const table = tableRef.current;
                if (table && typeof table.setColumnFilters === "function") {
                  const filters = [];
                  if (sourceFilter && sourceFilter !== "all")
                    filters.push({ id: "source", value: sourceFilter });
                  if (v) filters.push({ id: "date", value: v });
                  table.setColumnFilters(filters);
                }
              }}
            >
              <SelectTrigger className="rounded-md">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Period</SelectLabel>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bottom row (description text) */}
        <p className="text-xs text-gray-500 mt-2">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      {/* Table */}

      <DataTable
        ref={tableRef}
        loading={isLoading}
        columns={earningsColumns}
        data={tableData}
        pageSize={7}
      />
    </div>
  );
};

export default EarningsPage;
