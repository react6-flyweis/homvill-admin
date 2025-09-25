import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllPushNotifications } from "@/queries/pushNotification";

const NotificationsTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllPushNotifications();

  const notifications = data?.items || [];

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
        {/* Loading / Error */}
        {isLoading ? (
          <div className="p-4 text-center text-sm">
            Loading notifications...
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-sm text-red-600">
            {error?.message || "Failed to load notifications"}
          </div>
        ) : (
          <>
            {/* Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#8A1538] text-white text-left text-sm">
                  <th className="px-4 py-2 font-medium">NOTIFICATION TITLE</th>
                  <th className="px-4 py-2 font-medium">
                    NOTIFICATION CONTENT
                  </th>
                  <th className="px-4 py-2 font-medium">NOTIFICATION STATUS</th>
                  <th className="px-4 py-2 font-medium">DATE</th>
                  <th className="px-4 py-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {notifications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-center text-sm text-gray-500"
                    >
                      No notifications found.
                    </td>
                  </tr>
                ) : (
                  notifications.map((item) => (
                    <tr
                      key={item._id || item.push_notification_id}
                      className="border-t"
                    >
                      <td className="px-4 py-2">{item.title}</td>
                      <td className="px-4 py-2">{item.content}</td>
                      <td className="px-4 py-2">
                        {item.Status ? "Active" : "Inactive"}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(item.CreateAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Footer */}
            <div className="p-3">
              <button className="bg-[#8A1538] text-white text-sm px-4 py-2 rounded">
                Delete All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsTable;
