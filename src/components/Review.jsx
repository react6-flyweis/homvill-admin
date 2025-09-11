import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import home from "./assets/home.jpg";

const reviews = [
  {
    id: "#123456",
    name: "Desirae Culhane",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    property: {
      image: home,
      address: "47 W 13th St",
      city: "New York",
      zip: "1001",
      joined: "23-08-2024",
    },
    seller: {
      avatar: "https://randomuser.me/api/portraits/men/20.jpg",
      name: "Justin Vartos",
      phone: "+1 623 4567 8860",
      country: "United States",
      joined: "23-08-2024",
    },
  },
  {
    id: "#123457",
    name: "Dulce Vaccaro",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    property: {
      image: home,
      address: "47 W 13th St",
      city: "New York",
      zip: "1001",
      joined: "23-08-2024",
    },
    seller: {
      avatar: "https://randomuser.me/api/portraits/men/30.jpg",
      name: "Justin Vartos",
      phone: "+1 623 4567 8860",
      country: "United States",
      joined: "23-08-2024",
    },
  },
];

const ReviewCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 border">
      {/* Header */}
      <div className="flex justify-between items-start">
        <span className="bg-[#8A1538] text-white text-xs font-medium px-3 py-1 rounded">
          Buyer ID: {data.id}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          Ratings:{" "}
          <span className="text-yellow-500">
            {"★".repeat(data.rating)}
            <span className="text-gray-300">{"★".repeat(5 - data.rating)}</span>
          </span>
        </span>
      </div>

      {/* User Info */}
      <div className="flex gap-3 items-start">
        <img
          src={data.avatar}
          alt={data.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-[#363636]">{data.name}</h3>
          <p className="text-sm text-gray-600">{data.review}</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-[#363636] mt-2"
          >
            {showDetails ? "Hide details ▲" : "Review details ▼"}
          </button>
        </div>
      </div>

      {/* Expandable Section */}
      {showDetails && (
        <div className="border-t pt-3 mt-2 grid grid-cols-2 gap-4 text-sm">
          {/* Property Details */}
          <div>
            <h4 className="font-semibold mb-1">Property details</h4>
            <img
              src={data.property.image}
              alt="Property"
              className="w-20 h-16 rounded mb-2 object-cover"
            />
            <p>Street Address: {data.property.address}</p>
            <p>City: {data.property.city}</p>
            <p>Zip: {data.property.zip}</p>
            <p className="text-gray-500 text-xs">
              Joined: {data.property.joined}
            </p>
          </div>

          {/* Seller Details */}
          <div>
            <h4 className="font-semibold mb-1">Seller’s details</h4>
            <img
              src={data.seller.avatar}
              alt={data.seller.name}
              className="w-12 h-12 rounded-full mb-2 object-cover"
            />
            <p>Seller’s Name: {data.seller.name}</p>
            <p>Phone No: {data.seller.phone}</p>
            <p>Country: {data.seller.country}</p>
            <p className="text-gray-500 text-xs">
              Joined: {data.seller.joined}
            </p>
          </div>
        </div>
      )}

      {/* Delete Icon */}
      <div className="flex justify-end">
        <button className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const ReviewsPage = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-xl font-semibold">Users</h1> */}
        <h2 className="text-xl font-semibold mb-1">Reviews</h2>

        <select className="border px-3 py-1 rounded text-sm">
          <option>All</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      <div className="flex flex-col gap-4">
        {reviews.map((item, i) => (
          <ReviewCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
