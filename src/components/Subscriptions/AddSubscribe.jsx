import { useState, useEffect } from "react";
import { Plus, ArrowLeft, Minus } from "lucide-react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { SubscriptionForm } from "./SubscriptionForm";
import { useCreateSubscription } from "@/mutations/subscription";
import { toast } from "sonner";

export default function AddSubscription() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      subscriptionName: "",
      price: "",
      subscriptionFor: "",
      features: [{ name: "", quantity: "" }],
    },
  });

  const createSubscription = useCreateSubscription();

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard/subscribe");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, navigate]);

  async function onSubmit(data) {
    // transform form data to API payload
    // API expects: name, emozi, price, Lines: [{ Feactue_name, Quantity }], Subscription_for: [..], Feactue_name
    const payload = {
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
      await createSubscription.mutateAsync(payload);
      toast.success("Subscription created successfully");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: error?.message || "Failed to create subscription",
      });
    }
  }

  return (
    <div className=" mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeft
          onClick={() => navigate("/dashboard/subscribe")}
          size={20}
          className="cursor-pointer"
        />
        <h1 className="text-lg font-semibold">Add A Subscription</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* About Subscription Card */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-base font-medium mb-4">About Subscription</h2>
        <SubscriptionForm form={form} onSubmit={onSubmit} submitLabel={"Add"} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] h-[300px]  text-center">
            {/* Icon */}
            <div className="flex justify-center mt-12 mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-pink-400">
                <Check className="w-8 h-8 text-white" />
                {/* Dots animation effect */}
                <span className="absolute w-24 h-24 rounded-full border-4 border-pink-200 animate-ping"></span>
              </div>
            </div>

            {/* Message */}
            <p className="text-[#8A1538] font-medium mt-16 text-lg">
              A New Subscription Added Successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
