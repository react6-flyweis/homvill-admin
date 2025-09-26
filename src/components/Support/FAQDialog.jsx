import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useCreateFAQ, useUpdateFAQ } from "@/mutations/faq";
import { LoadingButton } from "@/components/ui/loading-button";
import { RootFormErrors } from "@/components/RootFormErrors";
import { toast } from "sonner";

export function FAQDialog({ open, onOpenChange, initialValues }) {
  const FAQSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  });

  const form = useForm({
    resolver: zodResolver(FAQSchema),
    defaultValues: { title: "", description: "" },
  });

  const createMut = useCreateFAQ();
  const updateMut = useUpdateFAQ();

  useEffect(() => {
    if (open && initialValues) {
      form.reset({
        title: initialValues.title || "",
        description: initialValues.description || "",
      });
    }

    if (open && !initialValues) {
      form.reset({ title: "", description: "" });
      form.clearErrors();
    }
  }, [initialValues, open]);

  const handle = async (values) => {
    try {
      if (initialValues) {
        await updateMut.mutateAsync({
          id: initialValues.id || initialValues.faq_id || initialValues._id,
          payload: {
            Title: values.title,
            Description: values.description,
            Status:
              typeof initialValues.Status === "boolean"
                ? initialValues.Status
                : true,
          },
        });
        toast.success("FAQ updated successfully");
      } else {
        await createMut.mutateAsync({
          Title: values.title,
          Description: values.description,
        });
        toast.success("FAQ created successfully");
      }
      onOpenChange(false);
      form.reset();
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      form.setError("root", { type: "manual", message: msg });
    }
  };

  const handleOpenChange = (val) => {
    if (!val) {
      form.clearErrors();
      form.reset();
    }
    if (onOpenChange) onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            {initialValues ? "Edit FAQ" : "Add FAQ"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handle)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="FAQ headline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="rounded"
                        placeholder="FAQ details"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="sm:justify-center">
                <LoadingButton
                  type="submit"
                  className="rounded w-28"
                  isLoading={form.formState.isSubmitting}
                >
                  {initialValues ? "Update" : "Add"}
                </LoadingButton>
              </DialogFooter>
            </form>
          </Form>
        </div>
        <RootFormErrors errors={form.formState.errors.root} />
      </DialogContent>
    </Dialog>
  );
}
