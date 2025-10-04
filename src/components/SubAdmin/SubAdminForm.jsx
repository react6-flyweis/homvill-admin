import { useNavigate } from "react-router-dom";
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
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/mutations/user";
import extractApiError from "@/lib/errorHandler";
import { RootFormErrors } from "@/components/RootFormErrors";
import { LoadingButton } from "@/components/ui/loading-button";

const schema = z
  .object({
    employeeId: z.string().min(1, "Employee ID is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(1, "Please re-enter password"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export const SubAdminForm = ({ initialEmployeeId = "", onCreate }) => {
  const createUser = useCreateUser();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: initialEmployeeId,
      email: "",
      password: "",
      rePassword: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const trimmedId = data.employeeId.trim();

    const payload = {
      Name: trimmedId,
      last_name: "",
      Responsibility_id: 1,
      Role_id: 4,
      Language_id: 1,
      Country_id: 1,
      State_id: 1,
      City_id: 1,
      zipcode: null,
      Employee_id: trimmedId,
      User_Category_id: 1,
      email: data.email?.trim() ?? "",
      phone: "1234567890",
      password: data.password ?? "1234567",
      gender: "Male",
      adhaar_date: "",
      adhaar_no: "",
    };

    try {
      // call create user API
      const res = await createUser.mutateAsync(payload);

      // build a minimal employee object to pass to permissions page
      const employee = {
        id: res.data?.user_id,
        name: res.data?.Name,
        image: "https://via.placeholder.com/40",
      };

      // navigate to permissions page and pass the employee in state
      navigate(`/dashboard/sub-admin/permissions`, { state: { employee } });
    } catch (err) {
      const msg = extractApiError(err);
      form.setError("root", { type: "server", message: msg });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border rounded-lg p-6 shadow-sm"
      >
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Employee ID <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="enter id" className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="enter email" className="h-10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-4 relative">
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="enter password"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="mt-4 relative">
              <FormLabel>
                Re-Enter Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="enter password"
                  className="h-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <RootFormErrors errors={form.formState.errors.root} />

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              form.reset({
                employeeId: initialEmployeeId,
                password: "",
                rePassword: "",
              })
            }
          >
            Cancel
          </Button>
          <LoadingButton type="submit" isLoading={form.formState.isSubmitting}>
            create
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
