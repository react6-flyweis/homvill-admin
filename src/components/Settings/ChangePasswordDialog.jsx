import React, { useEffect } from "react";
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
import { PasswordInput } from "@/components/ui/password-input";

// password rules: 8-20 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~`])[A-Za-z\d!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~`]{8,20}$/;

export function ChangePasswordDialog({ open, onOpenChange }) {
  const schema = z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(
          passwordRegex,
          "Password must include uppercase, lowercase, number and special character"
        ),
      confirmPassword: z.string().min(1, "Please re-enter password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      form.clearErrors();
    }
  }, [open]);

  const onSubmit = async (newPassword) => {
    try {
      // TODO: wire up to real change-password mutation
      toast.success("Password changed successfully");
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      toast.error("Failed to change password");
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
      <DialogContent className="sm:max-w-xl sm:max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-4 py-4 border-b border-primary">
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="border-primary"
                        placeholder="enter your password here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="border-primary"
                        placeholder="enter your password here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-sm text-gray-700">
                <p className="font-semibold">
                  Length:{" "}
                  <span className="font-normal">
                    Minimum 8 characters, maximum 20 characters.
                  </span>
                </p>
                <p className="font-semibold mt-2">
                  Complexity:{" "}
                  <span className="font-normal">
                    Must include at least one of each: Uppercase Letter (A-Z) •
                    Lowercase Letter (a-z) • Special Character • Number (0-9)
                  </span>
                </p>
              </div>

              <DialogFooter>
                <div className="w-full flex items-center justify-center">
                  <Button type="submit" className="w-32 rounded">
                    Next
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
