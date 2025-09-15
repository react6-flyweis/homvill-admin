import { FiPlus } from "react-icons/fi";
import { useRef, useState } from "react";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExportSelector } from "@/components/datatable/ExportSelector";
import { properties } from "@/components/Properties/propertyData";
import { propertyColumns } from "@/components/Properties/columns";
import { CategoryFilter } from "@/components/Properties/CategoryFilter";
import toursScheduledIcon from "@/components/assets/tours-scheduled.svg";

const PropertyTable = () => {
  const tableRef = useRef();

  const [filter, setFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredProperties = properties.filter(
    (p) =>
      (filter === "ALL" ? true : p.available === filter) &&
      (categoryFilter === "ALL" ? true : p.category === categoryFilter)
  );

  return (
    <div className=" ">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        {/* Left: Properties + Add button */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-800">Properties</h1>
          <Link to="/dashboard/properties/add">
            <Button variant="outline">
              <FiPlus size={16} /> Add A New Property
            </Button>
          </Link>
        </div>

        {/* Right: Filters + Actions */}
        <div className="flex items-center gap-1">
          {/* Tabs */}
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "ALL"
                ? "bg-[#800020] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("SALE")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "SALE"
                ? "bg-[#800020] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            SALE
          </button>
          <button
            onClick={() => setFilter("RENT")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === "RENT"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            RENT
          </button>

          {/* Filter (categories) */}
          <CategoryFilter
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />

          {/* Download Dropdown */}
          <ExportSelector tableRef={tableRef} />

          {/* Offer Raised */}
          <Link to="/dashboard/offer-enquiry">
            <Button>Offer Raised</Button>
          </Link>
          {/* Tours Scheduled */}
          <Link to="/dashboard/tours-scheduled">
            <Button>
              Tours Scheduled
              <img
                src={toursScheduledIcon}
                alt="Tours Scheduled"
                className="size-5"
              />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Row: Description */}
      <p className="text-xs text-gray-500 mt-1 mb-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Applied Filters */}
      <div className="mb-4">
        {(filter !== "ALL" || categoryFilter !== "ALL") && (
          <p className="text-sm text-gray-600">
            Applied filter:
            {filter !== "ALL" && (
              <span className="ml-2 mr-3 inline-block bg-gray-100 px-2 py-1 rounded text-xs">
                {filter}
              </span>
            )}
            {categoryFilter !== "ALL" && (
              <span className="ml-2 inline-flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1 rounded">
                <span className="text-pink-700 text-sm">{categoryFilter}</span>
                <button
                  onClick={() => setCategoryFilter("ALL")}
                  className="text-pink-600 bg-pink-100 size-6 rounded-full grid place-items-center"
                  title="Remove filter"
                >
                  ×
                </button>
              </span>
            )}
          </p>
        )}
      </div>

      {/* DataTable */}
      <div className="">
        <DataTable
          ref={tableRef}
          columns={propertyColumns}
          data={filteredProperties}
          rowClassName={(row) =>
            row.original?.status !== "available" ? "bg-green-100" : ""
          }
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default PropertyTable;
