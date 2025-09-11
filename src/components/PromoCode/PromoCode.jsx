import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import flat from "../assets/flat.svg"; // Verify this path is correct
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const PromoCodeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;

  // Dummy data
  const promoCodes = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    startDate: "12/06/2024",
    endDate: "12/05/2025",
    offerName: "Lorem Ipsum is Simply Dummy Text",
    discountType: i % 3 === 0 ? "Percentage Discount" : "Flat Discount",
  }));
  const navigate = useNavigate();

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = promoCodes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(promoCodes.length / itemsPerPage);

  // Index of highlighted row (9th row in current page, 0-based index)
  const highlightedRowIndex = 8; // 9th row (0-based)
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExtendDisabled, setIsExtendDisabled] = useState(true);

  // Ref to table for dynamic height calculation
  const tableRef = useRef(null);
  const [iconTop, setIconTop] = useState(0);

  // Calculate the top position of the 9th row dynamically
  useEffect(() => {
    if (tableRef.current && currentItems.length > highlightedRowIndex) {
      const tableRows = tableRef.current.querySelectorAll("tbody tr");
      const targetRow = tableRows[highlightedRowIndex];
      if (targetRow) {
        const tableRect = tableRef.current.getBoundingClientRect();
        const rowRect = targetRow.getBoundingClientRect();
        // Calculate top position relative to table, centering icon vertically
        const topPosition =
          rowRect.top -
          tableRect.top +
          tableRef.current.scrollTop +
          rowRect.height / 2 -
          12; // 12 is half of 24px icon height
        setIconTop(topPosition);
        console.log(`Icon top position: ${topPosition}px`); // Debug log
      } else {
        console.log("Target row not found"); // Debug log
        setIconTop(0);
      }
    } else {
      console.log("Not enough rows or tableRef not ready"); // Debug log
      setIconTop(0);
    }
  }, [currentPage, currentItems]);

  const handleIconClick = () => {
    setShowFirstModal(true);
  };

  const handleNoClick = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleDeleteForever = () => {
    setShowSecondModal(false);
  };

  const handleYesClick = () => {
    setShowFirstModal(false);
    setShowThirdModal(true);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsExtendDisabled(false);
  };

  const handleExtend = () => {
    if (!isExtendDisabled && selectedDate) {
      const updatedPromoCodes = promoCodes.filter(
        (_, idx) => idx !== indexOfFirst + highlightedRowIndex,
      );
      // Here you would typically update the state or backend, but for this example, we'll just log
      console.log(
        "Extended and removed row:",
        indexOfFirst + highlightedRowIndex,
      );
      setShowThirdModal(false);
      setSelectedDate(null);
      setIsExtendDisabled(true);
      // Reset icon visibility and row highlight logic would need state management here
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-start">
        {/* Left side: Title + Add New Subscription + description */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Promo Code</h2>

            <button
              onClick={() => navigate("/dashboard/promocode/createpromo")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
              hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
            >
              Create A New Promo Code <Plus size={16} />
            </button>
          </div>
          {/* description below heading */}
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      {/* Table wrapper */}
      <div className="relative p-2" style={{ overflow: "visible" }}>
        {" "}
        {/* Ensure no clipping */}
        {/* Outside side icon */}
        {currentItems.length > highlightedRowIndex && (
          <div
            className="absolute text-yellow-500 z-30 cursor-pointer"
            style={{ left: "-17px", top: `${iconTop}px` }}
            onClick={handleIconClick}
          >
            <img src={flat} alt="flat" className="w-6 h-6" />
          </div>
        )}
        {/* Table */}
        <table ref={tableRef} className="w-full border-collapse">
          <thead>
            <tr className="bg-[#8A1538] text-white text-sm">
              <th className="px-4 py-2 text-left">START DATE</th>
              <th className="px-4 py-2 text-left">END DATE</th>
              <th className="px-4 py-2 text-left">OFFER NAME</th>
              <th className="px-4 py-2 text-left">DISCOUNT TYPE</th>
              <th className="px-4 py-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => {
              const isHighlighted = idx === highlightedRowIndex;
              return (
                <tr
                  key={item.id}
                  className={`border-b text-sm ${
                    isHighlighted
                      ? "bg-red-100"
                      : idx % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2">{item.startDate}</td>
                  <td className="px-4 py-2">{item.endDate}</td>
                  <td className="px-4 py-2">{item.offerName}</td>
                  <td className="px-4 py-2">{item.discountType}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      onClick={() => navigate("/dashboard/promocode/editcode")}
                      className="text-[#8A1538] hover:text-black"
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-black">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showFirstModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-[#8A1538] font-bold">Promo Code Expired...!!!</p>
            <p>
              Do you want to extend and keep using this promo code <br /> going
              forward?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-[#8A1538] text-white rounded"
                onClick={handleNoClick}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-[#0A8910] text-white rounded"
                onClick={handleYesClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSecondModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-[#8A1538] font-bold">Promo Code Expired...!!!</p>
            <p>
              Delete this code permanently? Once deleted, it cannot be <br />{" "}
              recovered.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-[#BC0101] text-white rounded"
                onClick={handleDeleteForever}
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {showThirdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <p className="text-[#8A1538] font-bold">Promo Code Expired...!!!</p>
            <p>Select the end date until which this should remain active.</p>

            <input
              type="date"
              onChange={handleDateChange}
              className="mt-2 p-2 border rounded w-full block"
            />

            <button
              className="mt-4 px-4 py-2 bg-[#8A1538] text-white rounded disabled:bg-pink-300 w-full block"
              onClick={handleExtend}
              disabled={isExtendDisabled}
            >
              Extend
            </button>
          </div>
        </div>
      )}

      {/* Footer Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, promoCodes.length)} of {promoCodes.length}{" "}
          entries
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#8A1538] text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeTable;
