import React from "react";
import { useNavigate } from "react-router-dom";

import { PageLayout } from "@/components/layouts/PageLayout";
import { useCreatePromoCode } from "@/mutations/promoCode";
import extractApiError from "@/lib/errorHandler";
import { PromoForm } from "./PromoForm";
import { toast } from "sonner";

export default function CreatePromoCode() {
  const navigate = useNavigate();

  const createPromo = useCreatePromoCode();

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
      await createPromo.mutateAsync(payload);
      toast.success("Promo code created successfully");
      setTimeout(() => {
        navigate("/dashboard/promocode");
      }, 1000);
    } catch (error) {
      const message = extractApiError(error);
      form.setError("root", { type: "manual", message });
    }
  };

  return (
    <PageLayout
      title="Create A Promo Code"
      description="Create and configure promo codes for users"
    >
      <PromoForm onSubmit={onSubmit} isLoading={createPromo.isLoading} />
    </PageLayout>
  );
}
