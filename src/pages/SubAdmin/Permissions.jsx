import React, { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export default function Permissions() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee || null;
  const isEdit = !!location.state?.isEdit;
  const passedPermissions = location.state?.permissions || null;

  const form = useForm({
    defaultValues: {
      users: { edit: false, view: false },
      properties: { edit: false, view: false },
      contracts: { edit: false, view: false },
      subscription: { edit: false, view: false },
    },
  });

  // seed defaults if employee exists (demo)
  useEffect(() => {
    if (employee) {
      form.reset({
        // prefer passed permissions when available
        ...(passedPermissions || {
          users: { edit: true, view: true },
          properties: { edit: false, view: true },
          contracts: { edit: false, view: false },
          subscription: { edit: false, view: true },
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  function onSubmit(values) {
    // In a real app you'd send `values` to the backend
    console.log("Saving permissions for", employee, values);
    navigate(-1);
  }

  const resources = [
    { key: "users", label: "Users" },
    { key: "properties", label: "Properties" },
    { key: "contracts", label: "Contracts" },
    { key: "subscription", label: "Subscription" },
  ];

  return (
    <PageLayout
      title={isEdit ? "Edit Permissions" : "Permissions"}
      description="Monitor any changes made to your project, schema and content with audit logs."
    >
      <div
        className="p-6 flex flex-col h-full
      "
      >
        {/* {employee && (
          <div className="flex items-center gap-3 mb-4">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-semibold">{employee.name}</p>
              <p className="text-xs text-green-600">
                Employee ID: {employee.id}
              </p>
            </div>
          </div>
        )} */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1"
          >
            <div className="flex-1 space-y-6">
              {resources.map((res) => (
                <div
                  key={res.key}
                  className="flex items-center justify-between py-2  border-gray-100 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold">{res.label}</h3>

                  <div className="flex items-center gap-20">
                    <FormField
                      control={form.control}
                      name={`${res.key}.edit`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mb-0 text-sm">Edit</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`${res.key}.view`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mb-0 text-sm">View</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-end justify-end">
              <Button type="submit" size="lg" className="rounded ">
                {isEdit ? "Save Changes" : "Create Sub Admin"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
