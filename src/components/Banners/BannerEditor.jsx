import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import { useCreateBanner, useUpdateBanner } from "@/mutations/banner";
import { toast } from "sonner";
import DatePicker from "@/components/ui/DatePicker";

export function BannerEditor({ open, onOpenChange, initialValues }) {
  const bannerSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
  });

  console.log(initialValues);

  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      headline: initialValues?.headline || "",
      category: initialValues?.Catetory_id || "",
      date: initialValues?.publishingDate || "",
      description: initialValues?.Description || "",
      image: initialValues?.image || "",
    },
  });

  const createMutation = useCreateBanner();
  const updateMutation = useUpdateBanner();

  const onSubmit = async (values) => {
    // map form values to API payload keys expected by backend
    const payload = {
      headline: values.headline,
      Catetory_id: Number(values.category) || values.category,
      publishingDate: values.date,
      Description: values.description,
      banner_image: values.image,
      FaceBook_link: values.FaceBook_link || "",
      instagram_link: values.instagram_link || "",
      website_link: values.website_link || "",
      twitter_link: values.twitter_link || "",
    };

    try {
      if (initialValues && initialValues.Banners_id) {
        const id = initialValues.Banners_id;
        await updateMutation.mutateAsync({ id, ...payload });
        toast.success("Banner updated successfully");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Banner created successfully");
      }

      onOpenChange(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to save banner";
      toast.error(msg);
      // keep dialog open for user to correct
    }
  };

  // close dialog when `open` becomes false
  useEffect(() => {
    if (open) {
      // when opening, populate with provided initial values (edit case)
      form.reset({
        headline: initialValues?.headline ?? "",
        category: initialValues?.Catetory_id.toString() ?? "",
        date: initialValues?.publishingDate ?? "",
        description: initialValues?.Description ?? "",
        image: initialValues?.image ?? "",
      });
    } else {
      // reset form when dialog closes
      form.reset();
    }
  }, [open, initialValues]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Banner</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <label className="flex h-20 w-20 shrink-0 cursor-pointer items-center text-center justify-center rounded-lg border-2 border-dashed text-xs text-gray-500">
                {/* show current image note */}
                <span>Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      form.setValue("image", file.name);
                    }
                  }}
                />
              </label>

              <div className="flex-1 space-y-3">
                <FormField
                  name="headline"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter headline here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <FormField
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">
                          Publishing date
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            placeholder="publishing date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description."
                      {...field}
                      className="h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton
                type="submit"
                className="w-40 mx-auto"
                isLoading={form.formState.isSubmitting}
              >
                {initialValues ? "Update" : "Add"} Banner
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>

        <DialogClose asChild>
          <button aria-label="Close" className="sr-only" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
