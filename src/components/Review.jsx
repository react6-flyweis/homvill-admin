import React, { useState } from "react";
import home from "@/assets/home.jpg";
import { ReviewCard } from "./ReviewCard";
import { ReviewTypeFilter } from "./ReviewTypeFilter";
import { useGetAllReviews } from "@/queries/reviews";

const mapApiToCard = (r) => {
  // r matches the API shape from the example in the prompt
  return {
    id: r.Reviews_id ? `#${r.Reviews_id}` : r._id,
    name: r.user_id?.Name || r.CreateBy?.Name || "Unknown",
    avatar:
      r.user_id?.avatar ||
      "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(r.user_id?.Name || "U"),
    rating: r.Reviews_count || 0,
    review: r.Review_text || r.Title || "",
    property: {
      image: home,
      address: r.property?.address || "-",
      city: r.property?.city || "-",
      zip: r.property?.zip || "-",
      joined: r.CreateAt ? new Date(r.CreateAt).toLocaleDateString() : "-",
    },
    seller: {
      avatar:
        r.CreateBy?.avatar ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(r.CreateBy?.Name || "S"),
      name: r.CreateBy?.Name || "-",
      phone: r.CreateBy?.phone || "-",
      country: r.CreateBy?.country || "-",
      joined: r.CreateAt ? new Date(r.CreateAt).toLocaleDateString() : "-",
    },
  };
};

const ReviewsPage = () => {
  const [reviewTypeFilter, setReviewTypeFilter] = useState("ALL");
  const { data, isLoading, isError, error } = useGetAllReviews();

  const reviews = (data?.items || []).map(mapApiToCard);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold mb-1">Reviews</h2>
        <ReviewTypeFilter
          reviewTypeFilter={reviewTypeFilter}
          setReviewTypeFilter={setReviewTypeFilter}
        />
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      <div className="flex flex-col gap-4">
        {/* Skeleton loading placeholders */}
        {isLoading && (
          <>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-4 flex gap-4 items-start bg-white rounded shadow-sm animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="w-24 h-16 bg-gray-200 rounded" />
              </div>
            ))}
          </>
        )}

        {isError && (
          <div className="text-red-500">
            Failed to load reviews: {error?.message}
          </div>
        )}

        {!isLoading && !isError && reviews.length === 0 && (
          <div className="text-gray-500">No reviews found.</div>
        )}

        {!isLoading &&
          !isError &&
          reviews.map((item) => (
            <ReviewCard key={item.id || item._id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
