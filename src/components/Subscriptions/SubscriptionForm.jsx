import React from "react";
import { Plus, Minus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";

/**
 * Reusable subscription form UI.
 * Props:
 * - form: returned object from useForm()
 * - onSubmit: submit handler
 * - submitLabel: label for submit button
 */
export function SubscriptionForm({ form, onSubmit, submitLabel = "Add" }) {
  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="subscriptionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="subscriptionFor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription For</FormLabel>
                <FormControl>
                  <Input placeholder="Buyer/Seller/Contractor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-6 mb-6 mt-6">
          <h2 className="text-base font-medium mb-4">Features</h2>
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-end gap-4">
                <div className="flex-1">
                  <FormField
                    control={control}
                    name={`features.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Give a name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={control}
                    name={`features.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input placeholder="Enter quantity" {...field} />
                            <button
                              type="button"
                              onClick={() => append({ name: "", quantity: "" })}
                              className="ml-2 bg-[#8A1538] text-white p-2 rounded-md flex items-center justify-center"
                            >
                              <Plus size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-2 bg-[#FF4C5E] text-white p-2 rounded-md flex items-center justify-center"
                              disabled={fields.length === 1}
                            >
                              <Minus size={18} />
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="px-8 py-2 bg-[#8A1538] text-white rounded-md text-sm font-medium"
          >
            {submitLabel}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
