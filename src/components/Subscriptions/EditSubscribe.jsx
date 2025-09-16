import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubscriptionForm } from "./SubscriptionForm";

export default function EditSubscription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // In a real app you'd fetch existing subscription data by id.
  const existing = {
    subscriptionName: "Gold",
    price: "499",
    subscriptionFor: "Seller",
    features: [
      { name: "Feature A", quantity: "3" },
      { name: "Feature B", quantity: "5" },
    ],
  };

  const form = useForm({ defaultValues: existing });

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

  function onSubmit(data) {
    // TODO: integrate update API
    console.log("Updated subscription:", data);
    setIsOpen(true);
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
        <SubscriptionForm
          form={form}
          onSubmit={onSubmit}
          submitLabel={"Save"}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[500px] h-[300px]  text-center">
            <div className="flex justify-center mt-12 mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-pink-400">
                <Check className="w-8 h-8 text-white" />
                <span className="absolute w-24 h-24 rounded-full border-4 border-pink-200 animate-ping"></span>
              </div>
            </div>

            <p className="text-[#8A1538] font-medium mt-16 text-lg">
              Subscription updated successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
