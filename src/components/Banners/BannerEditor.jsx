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
import { Button } from "@/components/ui/button";

export function BannerEditor({ open, onOpenChange, onSave, initialValues }) {
  const bannerSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      headline: "",
      category: "",
      date: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = (values) => {
    // Provide the collected banner data
    if (onSave) onSave(values);
    onOpenChange(false);
  };

  // close dialog when `open` becomes false
  useEffect(() => {
    if (open) {
      // when opening, populate with provided initial values (edit case)
      form.reset({
        headline: initialValues?.headline ?? "",
        category: initialValues?.category ?? "",
        date: initialValues?.date ?? "",
        description: initialValues?.description ?? "",
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
                          <Input placeholder="publishing date" {...field} />
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
              <Button type="submit" className="w-40 mx-auto">
                Add
              </Button>
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
