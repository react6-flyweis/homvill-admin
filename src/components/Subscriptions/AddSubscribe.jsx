import { useState, useEffect } from "react";
import { Plus, ArrowLeft, Minus } from "lucide-react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddSubscription() {
  //   const [features, setFeatures] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [features, setFeatures] = useState([{ name: "", quantity: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures([...features, { name: "", quantity: "" }]);
  };

  const removeFeature = (index) => {
    if (features.length > 1) {
      const updated = features.filter((_, i) => i !== index);
      setFeatures(updated);
    }
  };
  useEffect(() => {
    let timer;
    if (isOpen) {
      // Close modal and navigate after 5 seconds
      timer = setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard/subscribe");
      }, 2000);
    }
    return () => clearTimeout(timer); // cleanup timer
  }, [isOpen, navigate]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Subscription Name
            </label>
            <input
              type="text"
              placeholder="Enter here"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="text"
              placeholder="Enter here"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Subscription For
            </label>
            <input
              type="text"
              placeholder="Buyer/Seller/Contractor"
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
            />
          </div>
        </div>
      </div>

      {/* About Subscription Features */}
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-base font-medium mb-4">About Subscription</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <label className="block text-sm font-medium mb-1">Feature Name</label>
                        <input
                            type="text"
                            placeholder="Give a name"
                            value={featureName}
                            onChange={(e) => setFeatureName(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Quantity</label>
                            <input
                                type="text"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
                            />
                        </div>
                        <button
                            onClick={addFeature}
                            className="bg-[#8A1538] text-white p-2 rounded-md flex items-center justify-center"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div> */}
        {features.map((feature, index) => (
          <div key={index} className="flex items-end gap-4">
            {/* Feature Name */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Feature Name
              </label>
              <input
                type="text"
                placeholder="Give a name"
                value={feature.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
              />
            </div>

            {/* Quantity */}
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Enter quantity"
                  value={feature.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8A1538]"
                />
                <button
                  onClick={addFeature}
                  className="ml-2 bg-[#8A1538] text-white p-2 rounded-md flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
                <button
                  onClick={() => removeFeature(index)}
                  className="ml-2 bg-[#FF4C5E] text-white p-2 rounded-md flex items-center justify-center"
                  disabled={features.length === 1}
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-2 bg-[#8A1538] text-white rounded-md text-sm font-medium"
        >
          Add
        </button>
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
    </div>
  );
}
