import React from "react";
import faq from "@/assets/faq.png";
import faq1 from "@/assets/faq1.png";
import { Link } from "react-router-dom";

const FaqSection = () => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Help & Support</h2>
        </div>
        {/* description below heading */}
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-200 flex justify-center gap-10">
        {[
          {
            label: "FAQs",
            icon: faq,
            route: "/dashboard/faq",
          },
          { label: "Contact Us", icon: faq1, route: "/dashboard/contact/" },
        ].map(({ label, icon, route }) => (
          <Link to={route} key={label} className="w-full">
            <div className="flex items-center gap-12 px-5 py-3 bg-white rounded-lg shadow-sm border border-gray-200 w-full justify-start">
              <img src={icon} alt="icon" className="w-6 h-6" />
              <span className="text-[20px] font-medium text-black">
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default FaqSection;
