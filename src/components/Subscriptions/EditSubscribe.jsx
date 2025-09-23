import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubscriptionForm } from "./SubscriptionForm";
import { SuccessDialog } from "@/components/ui/SuccessDialog";
import { useUpdateSubscription } from "@/mutations/subscription";
import { useGetSubscriptionById } from "@/queries/subscriptions";

export default function EditSubscription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openSuccess, setOpenSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      subscriptionName: "",
      price: "",
      subscriptionFor: "",
      features: [{ name: "", quantity: "" }],
    },
  });

  // Fetch existing subscription by id and populate the form
  const {
    data: subscriptionData,
    isLoading,
    isFetching,
  } = useGetSubscriptionById(id, {
    onError: (err) => console.error("Failed to load subscription:", err),
  });

  useEffect(() => {
    if (!subscriptionData) return;
    const payload = subscriptionData?.data || subscriptionData || {};

    const mapped = {
      // form expects subscriptionName, price (string), subscriptionFor (single value), features (array)
      subscriptionName: payload.name || payload.Feactue_name || "",
      price: payload.price != null ? String(payload.price) : "",
      subscriptionFor:
        Array.isArray(payload.Subscription_for) &&
        payload.Subscription_for.length
          ? payload.Subscription_for[0]
          : Array.isArray(payload.Subscription_for) &&
            payload.Subscription_for.length === 0
          ? ""
          : payload.Subscription_for || "",
      emozi: payload.emozi || "",
      id: payload.Subscriptions_id || payload._id || payload.id || null,
      // Map Lines -> features
      features:
        Array.isArray(payload.Lines) && payload.Lines.length
          ? payload.Lines.map((l) => ({
              name: l.Feactue_name || "",
              quantity: l.Quantity || "",
            }))
          : [{ name: "", quantity: "" }],
    };

    form.reset(mapped);
  }, [subscriptionData]);

  const updateSubscription = useUpdateSubscription();

  // Submit handler: map form data to API payload like AddSubscribe.jsx and run mutation
  async function onSubmit(data) {
    const payload = {
      id,
      name: data.subscriptionName,
      emozi: data.emozi || "",
      price: Number(data.price) || 0,
      Lines: Array.isArray(data.features)
        ? data.features.map((f) => ({
            Feactue_name: f.name,
            Quantity: f.quantity,
          }))
        : [],
      Subscription_for: data.subscriptionFor ? [data.subscriptionFor] : [],
      Feactue_name: data.subscriptionName || "",
    };

    try {
      await updateSubscription.mutateAsync(payload);
      setOpenSuccess(true);
    } catch (err) {
      console.error("Failed to update subscription:", err);
      form.setError("root", {
        type: "manual",
        message: err?.message || "Failed to update subscription",
      });
    }
  }

  function handleSuccessClose() {
    setOpenSuccess(false);
    navigate("/dashboard/subscribe");
  }

  return (
    <div className="mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft
          onClick={() => navigate("/dashboard/subscribe")}
          size={20}
          className="cursor-pointer"
        />
        <h1 className="text-lg font-semibold">Edit Subscription</h1>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-base font-medium mb-4">Edit Subscription</h2>

        {/* Loading skeleton while the subscription is being fetched */}
        {(isLoading || isFetching) && (
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="bg-white border rounded-lg shadow-sm p-4">
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Form when data is ready */}
        {!(isLoading || isFetching) && (
          <SubscriptionForm
            form={form}
            onSubmit={onSubmit}
            submitLabel={form.formState.isSubmitting ? "Saving..." : "Save"}
          />
        )}
      </div>

      <SuccessDialog
        open={openSuccess}
        message={"Subscription updated successfully"}
        onClose={handleSuccessClose}
      />
    </div>
  );
}
