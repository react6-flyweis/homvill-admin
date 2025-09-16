import React from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { avatarUrl, photoUrl } from "@/lib/utils";

const TransactionHistory = () => {
  const transaction = {
    id: "147854123696",
    date: "12-05-2024",
    seller: {
      id: "S4785412",
      name: "Livia Curtis",
      email: "example@gmail.com",
      phone: "+1 7889 451 541",
      avatar: avatarUrl("S4785412", 200),
    },
    buyer: {
      id: "B4785412",
      name: "Alena George",
      email: "example@gmail.com",
      phone: "+1 7889 451 541",
      avatar: avatarUrl("B4785412", 200),
    },
    property: {
      address: "47 W 13th St",
      city: "New York",
      zip: "10011",
      photos: [
        photoUrl("47 W 13th St-1", 400, 300),
        photoUrl("47 W 13th St-2", 400, 300),
        photoUrl("47 W 13th St-3", 400, 300),
      ],
    },
    amount: "$660,000",
    payment: "Online",
    status: "Completed",
  };

  return (
    <PageLayout
      title={`Transaction history`}
      description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">Transaction ID: {transaction.id}</h3>
            <p className="text-sm text-gray-500">
              Seller ID: {transaction.seller.id}
            </p>
          </div>
          <div className="text-sm text-gray-500">Date: {transaction.date}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Seller */}
          <div>
            <h4 className="font-medium mb-2">Seller</h4>
            <div className="flex items-start gap-4">
              <div className="max-w-28 h-full">
                <img
                  src={transaction.seller.avatar}
                  alt="seller"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Name</label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.seller.name}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Email
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.seller.email}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Phone No
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.seller.phone}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Buyer */}
          <div>
            <h4 className="font-medium mb-2">Buyer</h4>
            <div className="flex items-start gap-4">
              <img
                src={transaction.buyer.avatar}
                alt="buyer"
                className="w-28 h-full object-cover rounded-md"
              />
              <div className="flex-1">
                <label className="block text-xs text-gray-500">Name</label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.buyer.name}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Email
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.buyer.email}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Phone No
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.buyer.phone}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="">
            <h4 className="font-medium mb-2">Property Details</h4>
            <div className="grid grid-cols-2 gap-2 rounded-md p-2 bg-blue-100">
              {transaction.property.photos.slice(0, 3).map((p, i) => (
                <img
                  key={i}
                  src={p}
                  className="w-full h-24 object-cover rounded-md"
                  alt={`photo-${i}`}
                />
              ))}
              <div className="w-full h-20 bg-gray-100 rounded-md flex items-center justify-center text-sm">
                +2
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <label className="block text-xs text-gray-500">
                  Street Address
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.property.address}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">City</label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.property.city}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">Zip</label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.property.zip}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500">Amount</label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.amount}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Payment Mode
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.payment}
                  readOnly
                />

                <label className="block text-xs text-gray-500 mt-3">
                  Status
                </label>
                <input
                  className="border p-2 rounded w-full"
                  defaultValue={transaction.status}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TransactionHistory;
