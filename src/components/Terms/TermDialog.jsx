import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useCreateTerms, useUpdateTerms } from "@/mutations/terms";
import { RootFormErrors } from "@/components/RootFormErrors";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";

export function TermDialog({ open, onOpenChange, initialValues }) {
  const TermSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  });

  const form = useForm({
    resolver: zodResolver(TermSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createMut = useCreateTerms();
  const updateMut = useUpdateTerms();

  // when initialValues or open changes (e.g. editing an existing term or opening/closing), set or clear form values
  React.useEffect(() => {
    if (open && initialValues) {
      form.reset({
        title: initialValues.title || "",
        description: initialValues.description || "",
      });
    }

    // if dialog opened without initialValues (Add mode), ensure form is cleared
    if (open && !initialValues) {
      form.reset({ title: "", description: "" });
      form.clearErrors();
    }
  }, [initialValues, open]);

  const handle = async (values) => {
    try {
      if (initialValues) {
        // update
        await updateMut.mutateAsync({
          id: initialValues.id,
          terms_Condition_Title: values.title,
          Description: values.description,
          Status: initialValues.Status ?? true,
        });
        toast.success("Terms & Condition updated successfully");
      } else {
        await createMut.mutateAsync({
          terms_Condition_Title: values.title,
          Description: values.description,
        });
        toast.success("Terms & Condition created successfully");
      }
      onOpenChange(false);
    } catch (err) {
      // try to extract message
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      form.setError("root", { type: "manual", message: msg });
    }
  };

  // when dialog is closed externally, clear errors and reset
  const handleOpenChange = (val) => {
    if (!val) {
      form.reset();
    }
    if (onOpenChange) onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Terms & Condition</DialogTitle>
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
                        placeholder="Trams & Condition Title Here."
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
                    isLoading={form.formState.isSubmitting}
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
