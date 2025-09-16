import React, { useRef } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
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
import { Trash2Icon, EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    date: "12/05/2024",
    buyer: "Alena George",
    seller: "Livia Curtis",
    amount: "$660,000",
    source: "subscription",
    payment: "Online",
    transaction: "147854123668",
    status: "Completed",
  },
  {
    date: "12/05/2024",
    buyer: "Carter Franci",
    seller: "Kaiya Korsgaard",
    amount: "$660,000",
    source: "adds",
    payment: "Online",
    transaction: "147856123586",
    status: "Completed",
  },
  {
    date: "12/05/2024",
    buyer: "Jordyn Culhane",
    seller: "Angel Carder",
    amount: "$660,000",
    source: "listing-boost",
    payment: "Online",
    transaction: "143654123586",
    status: "Completed",
  },
  {
    date: "12/05/2024",
    buyer: "Alena George",
    seller: "Livia Curtis",
    amount: "$660,000",
    source: "subscription",
    payment: "Online",
    transaction: "147854123668",
    status: "Completed",
  },
  {
    date: "12/05/2024",
    buyer: "Carter Franci",
    seller: "Kaiya Korsgaard",
    amount: "$660,000",
    source: "adds",
    payment: "Online",
    transaction: "147856123586",
    status: "Completed",
  },
  {
    date: "12/05/2024",
    buyer: "Jordyn Culhane",
    seller: "Angel Carder",
    amount: "$660,000",
    payment: "Online",
    source: "adds",
    transaction: "143654123586",
    status: "Completed",
  },
  // Add more rows here (repeat for demo)
  {
    date: "01/06/2024",
    buyer: "Maya Turner",
    seller: "Owen Blake",
    amount: "$1,200,000",
    source: "boost-by-loan-providers",
    payment: "Offline",
    transaction: "158754123900",
    status: "Completed",
  },
  {
    date: "02/06/2024",
    buyer: "Noah Bennett",
    seller: "Emma Stone",
    amount: "$850,500",
    source: "subscription",
    payment: "Online",
    transaction: "158754124001",
    status: "Completed",
  },
  {
    date: "10/06/2024",
    buyer: "Liam Walker",
    seller: "Sophia Hill",
    amount: "$420,250",
    source: "adds",
    payment: "Online",
    transaction: "158754124102",
    status: "Completed",
  },
  {
    date: "15/06/2024",
    buyer: "Olivia Martin",
    seller: "Lucas Young",
    amount: "$2,300,000",
    source: "listing-boost",
    payment: "Offline",
    transaction: "158754124203",
    status: "Pending",
  },
  {
    date: "20/06/2024",
    buyer: "Ethan Scott",
    seller: "Ava King",
    amount: "$995,000",
    source: "subscription",
    payment: "Online",
    transaction: "158754124304",
    status: "Completed",
  },
];
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
  // Compute total earnings: parse amount strings like "$660,000" into numbers and sum
  const parseAmount = (amt) => {
    if (!amt) return 0;
    // remove any non-digit, non-dot characters (like $ and ,)
    const cleaned = String(amt).replace(/[^0-9.\-]/g, "");
    const n = parseFloat(cleaned);
    return Number.isNaN(n) ? 0 : n;
  };

  // Apply filters to the data
  const filteredData = data.filter((row) => {
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

  const columns = [
    {
      accessorKey: "date",
      header: "DATE",
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === "yearly") return true;
        const date = row.getValue(columnId);
        const parts = String(date).split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        if (filterValue === "monthly") return month === 6;
        if (filterValue === "weekly")
          return month === 6 && day >= 10 && day <= 20;
        return true;
      },
    },
    {
      accessorKey: "source",
      header: "SOURCE",
      // keep visible so the table can filter by it via ref; can be hidden later
    },
    {
      accessorKey: "buyer",
      header: "BUYER NAME",
    },
    {
      accessorKey: "seller",
      header: "SELLER NAME",
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: "payment",
      header: "PAYMENT MODE",
    },
    {
      accessorKey: "transaction",
      header: "TRANSACTION ID",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: (info) => (
        <span className="text-[#8A1538] font-medium">{info.getValue()}</span>
      ),
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => (
        <div className="flex justify-center ">
          <Button
            variant="ghost"
            size="icon"
            title="View"
            onClick={() =>
              navigate(
                `/dashboard/earning/transaction/${row.original.transaction}`
              )
            }
          >
            <EyeIcon className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon" title="Delete">
            <Trash2Icon className="text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

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
        columns={columns}
        data={data}
        showPagination={true}
      />
    </div>
  );
};

export default EarningsPage;
