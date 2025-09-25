import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreatePrivacy, useUpdatePrivacy } from "@/mutations/privacy";
import { RootFormErrors } from "@/components/RootFormErrors";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";

export function PrivacyDialog({ open, onOpenChange, initialValues }) {
  const PrivacySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  });

  const form = useForm({
    resolver: zodResolver(PrivacySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createMut = useCreatePrivacy();
  const updateMut = useUpdatePrivacy();

  React.useEffect(() => {
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
          id:
            initialValues.id ||
            initialValues.Privacy_policy_id ||
            initialValues._id,
          Privacy_policy_Title: values.title,
          Description: values.description,
          Status:
            typeof initialValues.Status === "boolean"
              ? initialValues.Status
              : true,
        });
        toast.success("Privacy & Policy updated successfully");
      } else {
        await createMut.mutateAsync({
          Privacy_policy_Title: values.title,
          Description: values.description,
        });
        toast.success("Privacy & Policy created successfully");
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
          <DialogTitle className="sr-only">Add Privacy & Policy</DialogTitle>
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
                      <Input
                        placeholder="Privacy & Policy Title Here."
                        {...field}
                      />
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
                        placeholder="Description."
                        className="rounded max-h-60"
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className="w-full flex items-center justify-center">
                  <LoadingButton
                    type="submit"
                    className="w-32 rounded"
                    isLoading={
                      form.formState.isSubmitting ||
                      createMut.isLoading ||
                      updateMut.isLoading
                    }
                  >
                    {initialValues ? "Update" : "Add"}
                  </LoadingButton>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
        <RootFormErrors errors={form.formState.errors.root} />
      </DialogContent>
    </Dialog>
  );
}
