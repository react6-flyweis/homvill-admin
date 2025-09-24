import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layouts/PageLayout";
import { avatarUrl, photoUrl } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEarningById } from "@/queries/earnings";

const TransactionHistory = () => {
  const { id } = useParams();

  const { data: earning, isLoading, isError, error } = useGetEarningById(id);

  // Map API response to transaction shape used by the UI
  const transaction = React.useMemo(() => {
    if (!earning) return null;

    // The API returns nested fields; safe-fallbacks used
    const seller = {
      id: earning?.seller?.user_id || earning?.seller?.userId || "-",
      name: earning?.seller?.Name || earning?.seller?.name || "-",
      email: earning?.seller?.email || "-",
      phone: earning?.seller?.phone || "-",
      avatar: avatarUrl(earning?.seller?.user_id || "-", 200),
    };

    const buyer = {
      id: earning?.Buyer?.user_id || earning?.Buyer?.userId || "-",
      name: earning?.Buyer?.Name || earning?.Buyer?.name || "-",
      email: earning?.Buyer?.email || "-",
      phone: earning?.Buyer?.phone || "-",
      avatar: avatarUrl(earning?.Buyer?.user_id || "-", 200),
    };

    const property = {
      address:
        earning?.Property_id?.Properties_id ||
        earning?.Property_id?.address ||
        "-",
      city: earning?.Property_id?.Property_city || "-",
      zip: earning?.Property_id?.zip || "-",
      photos: [
        photoUrl(earning?.Property_id?.Properties_id || "prop-1", 400, 300),
      ],
    };

    const amount =
      earning?.Transaction_id?.Amount || earning?.Transaction_id?.amount || "-";

    return {
      id: earning?.Earning_id || earning?._id || id,
      date: earning?.CreateAt
        ? new Date(earning.CreateAt).toLocaleDateString()
        : "-",
      seller,
      buyer,
      property,
      amount:
        typeof amount === "number" ? `$${amount.toLocaleString()}` : amount,
      payment: earning?.Transaction_id?.Payment || earning?.payment || "-",
      status: earning?.Transaction_status || earning?.Transaction_status || "-",
    };
  }, [earning, id]);

  return (
    <PageLayout
      title={`Transaction history`}
      description="Lorem ipsum is simply dummy text of the printing and typesetting industry."
    >
      <div className="bg-white rounded-lg shadow-sm p-6">
        {isLoading ? (
          <div>
            {/* Header skeleton */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Seller / Buyer skeletons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h4 className="font-medium mb-2">
                  <Skeleton className="h-5 w-24" />
                </h4>
                <div className="flex items-start gap-4">
                  <Skeleton className="w-28 h-28 rounded-md" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  <Skeleton className="h-5 w-24" />
                </h4>
                <div className="flex items-start gap-4">
                  <Skeleton className="w-28 h-28 rounded-md" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property & details skeleton */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="">
                <h4 className="font-medium mb-2">
                  <Skeleton className="h-5 w-40" />
                </h4>
                <div className="grid grid-cols-2 gap-2 rounded-md p-2">
                  <Skeleton className="w-full h-24 rounded-md" />
                  <Skeleton className="w-full h-24 rounded-md" />
                  <Skeleton className="w-full h-24 rounded-md" />
                  <Skeleton className="w-full h-24 rounded-md" />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-4 w-full mt-3 mb-2" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-4 w-full mt-3 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-4 w-full mt-3 mb-2" />
                    <Skeleton className="h-10 w-full" />

                    <Skeleton className="h-4 w-full mt-3 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="text-red-500">
            Error: {error?.message || "Failed to load"}
          </div>
        ) : !transaction ? (
          <div>No transaction found</div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">
                  Transaction ID: {transaction.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Seller ID: {transaction.seller.id}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                Date: {transaction.date}
              </div>
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

                    <label className="block text-xs text-gray-500 mt-3">
                      City
                    </label>
                    <input
                      className="border p-2 rounded w-full"
                      defaultValue={transaction.property.city}
                      readOnly
                    />

                    <label className="block text-xs text-gray-500 mt-3">
                      Zip
                    </label>
                    <input
                      className="border p-2 rounded w-full"
                      defaultValue={transaction.property.zip}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500">
                      Amount
                    </label>
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
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default TransactionHistory;
