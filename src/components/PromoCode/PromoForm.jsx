import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/ui/loading-button";
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
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function PromoForm({ defaultValues = {}, onSubmit }) {
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
      ...defaultValues,
    },
  });

  // When parent provides async-loaded defaults (Edit page), reset the form
  // so inputs receive the updated values. Normalize incoming values slightly
  // to match the form field shapes (strings for selects/dates/times).
  useEffect(() => {
    // Only apply reset when parent provided meaningful defaults
    if (!defaultValues || Object.keys(defaultValues).length === 0) return;

    const normalized = {
      ...defaultValues,
      // Coerce area to string because Select expects string values
      area:
        defaultValues.area === undefined || defaultValues.area === null
          ? "none"
          : String(defaultValues.area),
      // Ensure visibility is boolean
      visibility: !!defaultValues.visibility,
      // Ensure couponType and discountType are one of expected values
      couponType: defaultValues.couponType || "public",
      discountType: defaultValues.discountType || "flat",
      // Dates/times should be strings ('' when undefined)
      startDate: defaultValues.startDate ?? "",
      startTime: defaultValues.startTime ?? "",
      endDate: defaultValues.endDate ?? "",
      endTime: defaultValues.endTime ?? "",
      // Numbers should be left as-is (zod handles string->number transform)
    };

    form.reset(normalized);
  }, [defaultValues]);

  const internalSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values, form);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(internalSubmit)}
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
                    <SelectItem value="1">Area 1</SelectItem>
                    <SelectItem value="2">Area 2</SelectItem>
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
              isLoading={form.formState.isSubmitting}
            >
              Submit
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
