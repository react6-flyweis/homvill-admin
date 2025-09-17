import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "Notification Title Display Here",
    content: "Your Notification Message Display Here...",
    status: "Unread",
    date: "27 Aug 2024",
  },
  {
    id: 2,
    title: "Notification Title Display Here",
    content: "Your Notification Message Display Here...",
    status: "Unread",
    date: "27 Aug 2024",
  },
  {
    id: 3,
    title: "Notification Title Display Here",
    content: "Your Notification Message Display Here...",
    status: "Unread",
    date: "27 Aug 2024",
  },
  {
    id: 4,
    title: "Notification Title Display Here",
    content: "Your Notification Message Display Here...",
    status: "Unread",
    date: "27 Aug 2024",
  },
  {
    id: 5,
    title: "Notification Title Display Here",
    content: "Your Notification Message Display Here...",
    status: "Unread",
    date: "27 Aug 2024",
  },
];

const NotificationsTable = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Push Notification</h2>

          <Button
            variant={"outline"}
            onClick={() => navigate("create")}
            className="rounded hover:bg-primary hover:text-white"
          >
            Create A New Push Notification <PlusCircleIcon size={16} />
          </Button>
        </div>
        {/* description below heading */}
        <p className="text-sm text-gray-500 mt-1 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="bg-white shadow rounded-lg border overflow-hidden">
        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#8A1538] text-white text-left text-sm">
              <th className="px-4 py-2 font-medium">NOTIFICATION TITLE</th>
              <th className="px-4 py-2 font-medium">NOTIFICATION CONTENT</th>
              <th className="px-4 py-2 font-medium">NOTIFICATION STATUS</th>
              <th className="px-4 py-2 font-medium">DATE</th>
              <th className="px-4 py-2 font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {notifications.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.content}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-3">
          <button className="bg-[#8A1538] text-white text-sm px-4 py-2 rounded">
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTable;
