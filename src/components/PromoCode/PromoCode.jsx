import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { PromoExpiredDialog } from "./PromoExpiredDialog";
import { DataTable } from "@/components/datatable/DataTable";
import { useGetAllPromoCodes } from "@/queries/promoCodes";
import { columns } from "./promoCodeColumns";

const PromoCodeTable = () => {
  const navigate = useNavigate();
  const [openDialogId, setOpenDialogId] = useState(null);

  const { data, isLoading, isError, error } = useGetAllPromoCodes();

  const promoCodes = useMemo(() => {
    const items = data?.items || [];
    // Map server fields to table shape expected by DataTable
    return items.map((it) => ({
      id:
        it.Promo_Code_id ||
        it._id ||
        it.id ||
        Math.random().toString(36).slice(2),
      // API may use `StartDate` / `EndDate` (ISO strings) or `startDate`/`endDate`
      startDate: (() => {
        const val = it.StartDate || it.startDate || it.CreateAt;
        return val ? new Date(val).toLocaleDateString() : "-";
      })(),
      endDate: (() => {
        const val = it.EndDate || it.endDate || it.expiry_info?.end_date;
        return val ? new Date(val).toLocaleDateString() : "-";
      })(),
      // Offer & coupon
      offerName: it.offer_name || "-",
      couponCode: it.Coupon_code || "-",

      discountType: it.Diescount_type || "-",
      raw: it,
    }));
  }, [data]);

  const handleOpenDialog = (id) => setOpenDialogId(id);
  const handleCloseDialog = () => setOpenDialogId(null);

  return (
    <div className="relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Promo Code</h2>

            <button
              onClick={() => navigate("/dashboard/promocode/createpromo")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
              hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Create A New Promo Code <Plus size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>

      <div className="relative p-2" style={{ overflow: "visible" }}>
        {isError && (
          <div className="py-2 text-red-500">
            Error loading promo codes: {error?.message}
          </div>
        )}

        <DataTable
          tWrapperClassName="overflow-auto"
          columns={columns({ onOpenDialog: handleOpenDialog })}
          data={promoCodes}
          pageSize={7}
          loading={isLoading}
        />

        {openDialogId && (
          <PromoExpiredDialog
            promoId={openDialogId}
            open={!!openDialogId}
            onOpenChange={(v) => {
              if (!v) handleCloseDialog();
            }}
            onExtend={(date) => {
              console.log("Extend promo id", openDialogId, "to", date);
              handleCloseDialog();
            }}
            onDelete={() => {
              console.log("Delete promo id", openDialogId);
              handleCloseDialog();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PromoCodeTable;
