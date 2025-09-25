import React, { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PromoForm } from "./PromoForm";
import { useGetPromoById } from "@/queries/promoCodes";
import { useUpdatePromoCode } from "@/mutations/promoCode";
import extractApiError from "@/lib/errorHandler";

const EditPromoCode = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetPromoById(id);
  const updatePromo = useUpdatePromoCode();

  const defaults = useMemo(() => {
    // map API response shape to form fields, defensively
    const item = data?.data || {};
    return {
      offerName: item.offer_name || item.OfferName || "",
      couponCode: item.Coupon_code || item.coupon_code || "",
      couponType:
        item.Coupon_type && item.Coupon_type.toLowerCase().includes("private")
          ? "private"
          : "public",
      timesUsed: item.Coupon_count_used ?? item.timesUsed ?? undefined,
      usePerUser: item.use_Per_user ?? item.usePerUser ?? undefined,
      // Select_area_id can be an id or an object { Area_id, Area_name }
      area: item.Select_area_id
        ? typeof item.Select_area_id === "object"
          ? String(item.Select_area_id.Area_id ?? "none")
          : String(item.Select_area_id)
        : "none",
      visibility: item.visibility ?? true,
      discountType:
        item.Diescount_type &&
        item.Diescount_type.toLowerCase().includes("percentage")
          ? "percentage"
          : "flat",
      amount: item.Discount_amount ?? item.amount ?? undefined,
      // Normalize ISO datetimes to YYYY-MM-DD for date inputs and keep times
      startDate:
        item.StartDate && typeof item.StartDate === "string"
          ? item.StartDate.split("T")[0]
          : item.StartDate ?? "",
      startTime: item.StartTime ?? "",
      endDate:
        item.EndDate && typeof item.EndDate === "string"
          ? item.EndDate.split("T")[0]
          : item.EndDate ?? "",
      endTime: item.EndTime ?? "",
    };
  }, [data]);

  const onSubmit = async (values, form) => {
    const payload = {
      offer_name: values.offerName,
      Coupon_code: values.couponCode,
      Coupon_type:
        values.couponType === "public" ? "Public Coupon" : "Private Coupon",
      Coupon_count_used: values.timesUsed || 0,
      use_Per_user: values.usePerUser || 0,
      Select_area_id: values.area && values.area !== "none" ? values.area : 1,
      visibility: !!values.visibility,
      Diescount_type:
        values.discountType === "flat"
          ? "Flat Discount"
          : "Percentage Discount",
      Discount_amount: values.amount || 0,
      StartDate: values.startDate || undefined,
      StartTime: values.startTime || undefined,
      EndDate: values.endDate || undefined,
      EndTime: values.endTime || undefined,
    };

    try {
      await updatePromo.mutateAsync({ id, payload });
      toast.success("Promo code updated successfully");
      setTimeout(() => {
        navigate("/dashboard/promocode");
      }, 1000);
    } catch (error) {
      const message = extractApiError(error);
      form.setError("root", { type: "manual", message });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft
          onClick={() => navigate("/dashboard/promocode")}
          size={20}
          className="cursor-pointer"
        />
        <h1 className="text-lg font-semibold">Edit Promo Code</h1>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Edit the promo code details below.
      </p>

      <div>
        <PromoForm
          defaultValues={defaults}
          onSubmit={onSubmit}
          isLoading={updatePromo.isLoading || isLoading}
          submitLabel="Update"
        />
      </div>
    </div>
  );
};

export default EditPromoCode;
