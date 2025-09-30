import React, { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { LoadingButton } from "@/components/ui/loading-button";
import extractApiError from "@/lib/errorHandler";
import {
  useCreateSubadminPermission,
  useUpdateSubadminPermission,
} from "@/mutations/subadminPermission";
import { useGetSubadminPermissionByUser } from "@/queries/subadminPermission";
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
import { toast } from "sonner";

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

  // mutation hook for creating/updating sub-admin permissions
  const createPermission = useCreateSubadminPermission();
  const updatePermission = useUpdateSubadminPermission();

  // try to load existing permissions for this user
  const userId = employee?.id || null;
  const { data: existingPermRes, isLoading: loadingPerm } =
    useGetSubadminPermissionByUser(userId, {
      enabled: !!userId,
    });

  // when fetched, normalize and seed form if permissions available
  useEffect(() => {
    const perm = existingPermRes?.data || existingPermRes || null;
    if (perm) {
      // perm might have keys like User, Properties etc. Map to our form shape
      form.reset({
        users: {
          edit: !!(perm.User && perm.User[0] && perm.User[0].Edit),
          view: !!(perm.User && perm.User[0] && perm.User[0].View),
        },
        properties: {
          edit: !!(
            perm.Properties &&
            perm.Properties[0] &&
            perm.Properties[0].Edit
          ),
          view: !!(
            perm.Properties &&
            perm.Properties[0] &&
            perm.Properties[0].View
          ),
        },
        contracts: {
          edit: !!(
            perm.Contracts &&
            perm.Contracts[0] &&
            perm.Contracts[0].Edit
          ),
          view: !!(
            perm.Contracts &&
            perm.Contracts[0] &&
            perm.Contracts[0].View
          ),
        },
        subscription: {
          edit: !!(
            perm.Subscription &&
            perm.Subscription[0] &&
            perm.Subscription[0].Edit
          ),
          view: !!(
            perm.Subscription &&
            perm.Subscription[0] &&
            perm.Subscription[0].View
          ),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingPermRes]);

  // seed defaults if employee exists (demo)
  useEffect(() => {
    if (employee) {
      form.reset({
        // prefer passed permissions when available
        ...(passedPermissions || {
          users: { edit: false, view: false },
          properties: { edit: false, view: false },
          contracts: { edit: false, view: false },
          subscription: { edit: false, view: false },
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  async function onSubmit(values) {
    // Build payload according to API schema provided by user
    const payload = {
      user_id: employee?.id || null,
      User: [
        {
          Edit: !!values.users?.edit,
          View: !!values.users?.view,
        },
      ],
      Properties: [
        {
          Edit: !!values.properties?.edit,
          View: !!values.properties?.view,
        },
      ],
      Contracts: [
        {
          Edit: !!values.contracts?.edit,
          View: !!values.contracts?.view,
        },
      ],
      Subscription: [
        {
          Edit: !!values.subscription?.edit,
          View: !!values.subscription?.view,
        },
      ],
      ApprovedStatus: true,
      Description: null,
    };

    try {
      // if existing permission object exists, call update endpoint else create
      const existing = existingPermRes?.data || existingPermRes || null;
      if (existing) {
        // include identifier if API expects it
        const updatePayload = {
          ...payload,
          id: existing.SubAdmin_Permission_id,
        };
        await updatePermission.mutateAsync(updatePayload);
        toast.success("Permissions updated successfully");
      } else {
        await createPermission.mutateAsync(payload);
        toast.success("Permissions added successfully");
      }

      navigate(-1);
    } catch (err) {
      const msg = extractApiError(err);
      form.setError("root", { type: "server", message: msg });
    }
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
              <LoadingButton
                type="submit"
                size="lg"
                className="rounded "
                isLoading={
                  createPermission.isLoading || form.formState.isSubmitting
                }
              >
                {isEdit ? "Save Changes" : "Create Sub Admin"}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
