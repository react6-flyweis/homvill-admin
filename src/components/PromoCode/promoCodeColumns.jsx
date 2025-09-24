import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import flat from "@/assets/flat.svg";

// DataTable columns factory
export const columns = ({ onOpenDialog }) => [
  {
    accessorKey: "startDate",
    header: "START DATE",
    cell: ({ row }) => {
      const id = row.original.id;

      const rawEnd = row.original?.raw?.endDate || row.original?.raw?.EndDate;
      const isExpired = rawEnd ? new Date(rawEnd) < new Date() : false;

      return (
        <div className="flex ">
          {isExpired && (
            <div
              className="absolute text-yellow-500 z-30 cursor-pointer"
              onClick={() => onOpenDialog(id)}
            >
              <img src={flat} alt="flat" className="w-6 h-6" />
            </div>
          )}
          <div className="ml-8">{row.original.startDate}</div>
        </div>
      );
    },
  },
  { accessorKey: "endDate", header: "END DATE" },
  { accessorKey: "offerName", header: "OFFER NAME" },
  { accessorKey: "discountType", header: "DISCOUNT TYPE" },
  {
    accessorKey: "actions",
    header: "ACTION",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className="flex justify-center gap-3">
          <button
            onClick={() =>
              navigate(`/dashboard/promocode/editcode/${row.original.id}`)
            }
            className="text-primary hover:text-black"
          >
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-black">
            <FaTrash />
          </button>
        </div>
      );
    },
  },
];
