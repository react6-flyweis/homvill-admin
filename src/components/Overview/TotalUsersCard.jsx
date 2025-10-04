import React from "react";
import person from "@/assets/person.png";

const TotalUsersCard = ({ total = 840, newUsers = 40, oldUsers = 800 }) => {
  return (
    <div className="relative w-full rounded-lg overflow-visible mt-12">
      {/* main rounded card with gradient */}
      <div className="relative rounded-2xl  shadow-lg">
        {/* large soft shadow that appears beneath the card (matches design) */}
        <div
          className="absolute left-6 right-6 -bottom-8 h-14 rounded-2xl"
          style={{
            background: "rgba(0,0,0,0.25)",
            filter: "blur(28px)",
            zIndex: -1,
          }}
        />
        <div className="flex bg-gradient-to-tr from-white via-pink-500 to-pink-800 rounded-2xl overflow-visible">
          <div className="w-2/3 p-10 text-white relative">
            <h3 className="text-xl">Total Users</h3>
            <div className="text-3xl leading-none font-bold mt-6">{total}</div>

            <div className="flex gap-6 mt-4">
              {/* New Users card */}
              <div className="flex-1 bg-white rounded-2xl p-3 shadow-[0_24px_40px_rgba(0,0,0,0.12)] relative overflow-visible">
                <h4 className="font-semibold text-black">New Users</h4>
                <div className="text-4xl font-bold mt-3 text-black">
                  {newUsers}
                </div>
                {/* percentage pill — intentionally overlaps the card edge */}
                <div className="absolute top-1/2 transform -translate-y-1/2 -right-6 bg-[#FFECEC] text-[#D94A3A] rounded-full px-4 py-2 text-sm font-medium shadow-[0_10px_25px_rgba(217,74,58,0.18)]">
                  51% ↓
                </div>
              </div>

              {/* Old Users card */}
              <div className="flex-1 bg-white rounded-2xl p-3 shadow-[0_14px_24px_rgba(0,0,0,0.08)] relative overflow-visible">
                <h4 className="font-semibold text-black">Old Users</h4>
                <div className="text-4xl font-bold mt-3 text-black">
                  {oldUsers}
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 bg-[#E9FFF2] text-[#1F9D59] rounded-full px-3.5 py-1.5 text-sm font-medium shadow-[0_8px_20px_rgba(31,157,89,0.12)]">
                  20% ↑
                </div>
              </div>
            </div>
          </div>

          {/* Person image on the right, overlapping the card edge */}
          <div className="w-2/5 relative">
            <img
              src={person}
              alt="person"
              className="absolute right-0 bottom-0 h-[140%] object-cover"
            />
            {/* soft bottom fade to mimic overlay */}
            <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUsersCard;
