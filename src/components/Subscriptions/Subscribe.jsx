import React from "react";
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { SubCard } from "./SubCard";
import { useGetAllSubscriptions } from "@/queries/subscriptions";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
  const navigate = useNavigate();
  const {
    data: subsData,
    isLoading,
    isError,
    refetch,
  } = useGetAllSubscriptions();

  const mapLinesToFeatures = (lines = []) =>
    Array.isArray(lines)
      ? lines.map((l) => `${l?.Feactue_name || "Feature"} x${l?.Quantity ?? 1}`)
      : [];

  const handleRetry = () => {
    if (typeof refetch === "function") return refetch();
    // fallback: full reload
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Error state */}
      {isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-red-700">
              Failed to load subscriptions
            </h3>
            <p className="text-sm text-red-600 mt-1">
              There was an error fetching subscription data. Please try again.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRetry}
              className="px-3 py-1 bg-[#8A1538] text-white rounded-md text-sm font-medium shadow"
            >
              Retry
            </button>
          </div>
        </div>
      ) : null}
      {/* Header */}
      <div className="flex justify-between items-start">
        {/* Left side: Title + Add New Subscription + description */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Subscriptions</h2>

            <button
              onClick={() => navigate("/dashboard/subscribe/addsubscribe")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-sm font-medium border shadow-md
  hover:bg-[#8A1538] hover:text-white transition-colors duration-200"
            >
              Add A New Subscription <Plus size={16} />
            </button>
          </div>
          {/* description below heading */}
          <p className="text-sm text-gray-500 mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        {/* Right side: Active Subscriptions */}
        <button
          onClick={() => navigate("/dashboard/subscribe/active")}
          className="px-4 py-2 bg-[#8A1538] text-white rounded-md text-sm font-medium shadow"
        >
          Active Subscriptions
        </button>
      </div>

      {/* Subscription Cards (render top 3 from API only) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? // show 3 skeleton cards
            [0, 1, 2].map((n) => (
              <div
                key={`skeleton-card-${n}`}
                className="p-4 bg-white rounded-md border animate-pulse h-40"
              >
                <div className="h-6 bg-gray-200 rounded w-3/5 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/5 mb-2"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))
          : (Array.isArray(subsData?.items)
              ? subsData.items.slice(0, 3)
              : []
            ).map((sub, i) => {
              const role = Array.isArray(sub.Subscription_for)
                ? sub.Subscription_for[0] || ""
                : sub.Subscription_for || "";

              const plan = sub.name || "";
              const price =
                typeof sub.price === "number"
                  ? `$${sub.price} / mo`
                  : sub.price || "";
              const features = mapLinesToFeatures(sub.Lines || []);
              const editId = sub?.Subscriptions_id ?? sub?._id ?? i;
              const key = sub._id ?? `sub-${i}`;

              return (
                <SubCard
                  key={key}
                  role={role}
                  plan={plan}
                  price={price}
                  features={features}
                  onEdit={() => navigate(`/dashboard/subscribe/edit/${editId}`)}
                />
              );
            })}
      </div>

      {/* Subscription Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-[#8A1538] text-left text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">FEATURES</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">TOTAL FEATURES</th>
              <th className="px-4 py-2">Subscription For</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // skeleton table rows
              [0, 1, 2, 3].map((n) => (
                <tr key={`s-row-${n}`} className="border-b">
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                  </td>
                </tr>
              ))
            ) : subsData?.items && subsData.items.length > 0 ? (
              subsData.items.map((s, i) => {
                const featuresArr = mapLinesToFeatures(s.Lines || []);
                const totalFeatures = Array.isArray(s.Lines)
                  ? s.Lines.reduce((acc, l) => acc + (l?.Quantity ?? 1), 0)
                  : 0;
                const priceStr =
                  typeof s.price === "number"
                    ? `$${s.price} / mo`
                    : s.price || "-";
                const subFor = Array.isArray(s.Subscription_for)
                  ? s.Subscription_for.join(", ")
                  : s.Subscription_for || "";

                return (
                  <tr key={s._id || i} className="border-b  hover:bg-gray-50">
                    <td
                      className="px-4 py-2 text-gray-800 border-r font-medium"
                      style={{
                        background:
                          "linear-gradient(241.96deg, #FF6794 -7.86%, #FFE6EE 62.28%, #FFFFFF 132.41%)",
                      }}
                    >
                      {s.name}
                    </td>

                    <td className="px-4 py-2 border-r text-gray-600">
                      {featuresArr.length ? featuresArr.join(", ") : "-"}
                    </td>
                    <td className="px-4 py-2 border-r">{priceStr}</td>
                    <td className="px-4 py-2 border-r">{totalFeatures}</td>
                    <td className={`px-4 py-2  font-medium`}>{subFor}</td>
                    <td className="px-4 py-2 text-gray-500">
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/subscribe/edit/${
                              s.Subscriptions_id ?? i
                            }`
                          )
                        }
                      >
                        <Pencil size={16} className="inline" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              // empty state when not loading & no items
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-600">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
