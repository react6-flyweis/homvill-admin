import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageLayout } from "../layouts/PageLayout";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { MediaSelector } from "./MediaSelector";

const pushSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  media: z.any().optional(),
  whom: z.enum(["all", "single"]),
  recipient: z.string().optional(),
  repeat: z.union([z.literal("yes"), z.literal("no")]).optional(),
  repeatType: z
    .enum(["2days", "weekly", "monthly_once", "monthly_twice"])
    .optional(),
});

export default function CreatePush() {
  const form = useForm({
    resolver: zodResolver(pushSchema),
    defaultValues: {
      title: "",
      content: "",
      media: undefined,
      whom: "all",
      recipient: "all",
      repeat: "no",
      repeatType: "2days",
    },
  });

  const onSubmit = (values) => {
    // Mock submit - replace with real API call
    console.log("Submit push notification:", values);
    window.alert("Push notification created (mock)");
    form.reset();
  };

  return (
    <PageLayout
      title="Create A Push Notifications"
      description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-base font-semibold mb-4">Create</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="media"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Notification Media{" "}
                      <span className="text-sm text-muted">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <MediaSelector
                        value={field.value}
                        onChange={(m) => field.onChange(m)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="lg:w-1/2">
                  <FormLabel>Notification Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write here"
                      {...field}
                      className="min-h-[120px] rounded"
                    />
                  </FormControl>
                  <div className="text-sm text-gray-500 mt-1">
                    {(field.value || "").length}/10000
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-1/2">
              <FormLabel className="mb-2">Whom to Send</FormLabel>
              <FormField
                control={form.control}
                name="whom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-6"
                      >
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="all" />
                          <span>All</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="single" />
                          <span>Single</span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel className="sr-only">Recipient</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded w-full">
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="buyer">Buyer</SelectItem>
                          <SelectItem value="seller">Seller</SelectItem>
                          <SelectItem value="renter">Renter</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-1/2">
              <FormLabel className="mb-2">Repeat Notification..?</FormLabel>
              <FormField
                control={form.control}
                name="repeat"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex items-center gap-6"
                      >
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="no" />
                          <span>No</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <RadioGroupItem value="yes" />
                          <span>Yes</span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Repeat options - enabled only when repeat switch is on */}
              <FormField
                control={form.control}
                name="repeatType"
                render={({ field }) => {
                  const repeatEnabled = form.watch("repeat") === "yes";
                  const options = [
                    { id: "2days", label: "2 Days Once" },
                    { id: "weekly", label: "Weekly Once" },
                    { id: "monthly_once", label: "Monthly Once" },
                    { id: "monthly_twice", label: "Monthly Twice" },
                  ];

                  return (
                    <FormItem className="mt-4">
                      <div
                        className={`flex gap-4 ${
                          !repeatEnabled ? "opacity-30 pointer-events-none" : ""
                        }`}
                      >
                        {options.map((opt) => {
                          const selected = field.value === opt.id;
                          return (
                            <Button
                              key={opt.id}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(opt.id)}
                              className="rounded border border-primary text-xs"
                            >
                              {opt.label}
                            </Button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button className="w-40 rounded " type="submit">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
