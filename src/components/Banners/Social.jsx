import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";

import { FaGlobe } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { IoMdShareAlt } from "react-icons/io";
import nrk from "@/assets/nrk.svg";
import share from "@/assets/share.svg";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SocialLinks = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //   const links = [
  //     {
  //       label: "Facebook Link",
  //       icon: <FaFacebookF />,
  //       color: "bg-[#8A1538]",
  //       link: "https://www.facebook.com/Homvillhome",
  //     },
  //     {
  //       label: "Instagram Link",
  //       icon: <FaInstagram />,
  //       color: "bg-[#8A1538]",
  //       link: "https://www.instagram.com/Homvillhome",
  //     },
  //     {
  //       label: "Website Link",
  //       icon: <FaGlobe />,
  //       color: "bg-[#8A1538]",
  //       link: "https://www.Homvill.in/home",
  //     },
  //     {
  //       label: "Twitter Link",
  //       icon: <FaTwitter />,
  //       color: "bg-[#8A1538]",
  //       link: "",
  //     },
  //   ];
  const links = [
    {
      label: "Facebook Link",
      value: "https://www.facebook.com/Homvillhome",
      badge: { className: "bg-[#1877F2]" },
      icon: <FaFacebookF className="text-white text-[10px]" />,
    },
    {
      label: "Instagram Link",
      value: "https://www.instagram.com/Homvillhome",
      // insta gradient badge
      badge: {
        className:
          "bg-[linear-gradient(135deg,#F58529_0%,#DD2A7B_55%,#515BD4_100%)]",
      },
      icon: <FaInstagram className="text-white text-[10px]" />,
    },
    {
      label: "Website Link",
      value: "https://www.Homvill.in/home",
      badge: { className: "bg-[#8A1538]" },
      icon: <FaGlobe className="text-white text-[10px]" />,
    },
    {
      label: "Twitter Link",
      value: "",
      badge: { className: "bg-[#1DA1F2]" },
      icon: <FaTwitter className="text-white text-[10px]" />,
    },
  ];
  return (
    <div className="">
      {/* Heading */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <img
          onClick={() => navigate("/dashboard/banners")}
          src={nrk}
          className="cursor-pointer"
        ></img>{" "}
        Social Links
      </h2>
      <p className="text-sm text-gray-500 mt-1 mx-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>

      {/* Card */}
      <div className="bg-[#F6F6F6] rounded-xl shadow p-6 mt-4">
        {/* Top bar */}
        <div className="flex justify-end gap-2 items-center mb-4">
          <img
            src={share}
            onClick={() => setOpen(true)}
            className="text-xl cursor-pointer"
          />

          <button
            onClick={() => navigate("/dashboard/banners/new")}
            className="bg-[#8A1538] text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add New Links
          </button>
          {open && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              {/* Modal */}
              <div className="bg-white rounded-xl shadow-lg w-[300px] p-4 relative">
                {/* Header */}
                <h3 className="text-sm font-semibold text-[#8A1538] mb-2">
                  Share Links?
                </h3>
                <hr className="mb-3" />

                {/* Content */}
                <p className="text-gray-700 text-sm mb-3">Share To:</p>
                <div className="flex items-center gap-4">
                  {/* Custom Icon */}
                  <button className="w-10 h-10 rounded-full bg-[#8A1538] flex items-center justify-center text-white">
                    <FaRegNewspaper />
                  </button>

                  {/* WhatsApp */}
                  <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <FaWhatsapp />
                  </button>

                  {/* Twitter */}
                  <button className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white">
                    <FaTwitter />
                  </button>

                  {/* Other text */}
                  <span className="text-sm text-gray-600">Other</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links list */}
        <div className="space-y-3">
          {links.map((it, i) => (
            <div
              key={i}
              className="grid items-center gap-3 grid-cols-[180px_1fr_28px]"
            >
              {/* Left pill button (label + tiny brand circle) */}
              <button
                type="button"
                className="h-10 w-[180px] rounded-xl px-3 text-white text-sm font-medium
                       flex items-center justify-between shadow-sm
                       bg-[#8A1538]"
              >
                <span className="truncate">{it.label}</span>

                <span
                  className={`ml-2 w-5 h-5 rounded-full flex items-center justify-center ${it.badge.className}`}
                >
                  {it.icon}
                </span>
              </button>

              {/* Right input (separate block) */}
              <input
                type="text"
                readOnly
                value={it.value || ""}
                placeholder="No Link Found"
                className="h-10 w-full rounded-xl bg-[#EBEBEB] px-4 text-sm text-gray-700
                       outline-none placeholder-gray-400"
              />

              {/* Edit icon */}
              <button
                type="button"
                className="h-10 w-7 grid place-items-center rounded-md hover:bg-gray-100"
                aria-label="Edit"
              >
                <FiEdit2 className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
