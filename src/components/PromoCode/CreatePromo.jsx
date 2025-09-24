import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PageLayout } from "@/components/layouts/PageLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreatePromoCode } from "@/mutations/promoCodes";
import { LoadingButton } from "@/components/ui/loading-button";
import extractApiError from "@/lib/errorHandler";
import { RootFormErrors } from "@/components/RootFormErrors";

const promoSchema = z.object({
  offerName: z.string().min(1, "Offer name is required"),
  couponCode: z.string().min(1, "Coupon code is required"),
  couponType: z.enum(["public", "private"]).default("public"),
  timesUsed: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .or(
      z
        .string()
        .regex(/^\d*$/)
        .transform((s) => (s === "" ? undefined : Number(s)))
    ),
  usePerUser: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .or(
      z
        .string()
        .regex(/^\d*$/)
        .transform((s) => (s === "" ? undefined : Number(s)))
    ),
  area: z.union([z.string(), z.literal("none")]).optional(),
  visibility: z.boolean().default(true),
  discountType: z.enum(["flat", "percentage"]).default("flat"),
  amount: z
    .number()
    .positive("Amount must be greater than 0")
    .optional()
    .or(
      z
        .string()
        .regex(/^\d*(?:\.\d+)?$/)
        .transform((s) => (s === "" ? undefined : Number(s)))
    ),
  startDate: z.string().optional(),
  startTime: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
});

export default function CreatePromoCode() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      offerName: "",
      couponCode: "",
      couponType: "public",
      timesUsed: undefined,
      usePerUser: undefined,
      area: "none",
      visibility: true,
      discountType: "flat",
      amount: undefined,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
  });

  const createPromo = useCreatePromoCode();

  const onSubmit = async (values) => {
    // map form values to API payload expected structure
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
      navigate("/dashboard/promocode");
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid bg-white shadow rounded-md p-3 grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField
            name="offerName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="couponCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="couponType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="public" />
                      <span>Public Coupon</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="private" />
                      <span>Private Coupon</span>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="timesUsed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of times code has been used</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="usePerUser"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Use per user</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="area"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Area</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Select any</SelectItem>
                      <SelectItem value="area1">Area 1</SelectItem>
                      <SelectItem value="area2">Area 2</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="visibility"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visibility</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      Toggle OFF, in case you don’t want to show this coupon to
                      your users.
                    </span>
                    <Checkbox
                      checked={!!field.value}
                      onCheckedChange={(v) => field.onChange(!!v)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="discountType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex items-center gap-6"
                  >
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="flat" />
                      <span>Flat Discount</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <RadioGroupItem value="percentage" />
                      <span>Percentage Discount</span>
                    </label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="startTime"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="endTime"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <RootFormErrors errors={form.formState.errors.root} />

            <div className="flex justify-center items-center gap-4">
              <LoadingButton
                type="submit"
                className="w-36 rounded text-sm font-medium"
                isLoading={createPromo.isLoading}
              >
                {createPromo.isLoading ? "Adding..." : "Add"}
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}
