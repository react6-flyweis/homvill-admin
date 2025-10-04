import React from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllPushNotifications } from "@/queries/pushNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeletePush } from "@/mutations/pushNotification";
import { toast } from "sonner";
import { useState } from "react";

const NotificationsTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllPushNotifications();

  const notifications = data?.items || [];

  const [toDelete, setToDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const deleteMut = useDeletePush();

  async function handleConfirmDelete(id) {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Notification deleted successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete notification";
      toast.error(msg);
    } finally {
      setToDelete(null);
      setShowDelete(false);
    }
  }

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
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-3 text-center text-sm text-gray-500"
                >
                  Loading notifications...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-3 text-center text-sm text-red-600"
                >
                  {error?.message || "Failed to load notifications"}
                </td>
              </tr>
            ) : notifications.length === 0 ? (
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
                    <button
                      onClick={() => {
                        setToDelete(item.push_notification_id);
                        setShowDelete(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
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
      </div>

      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title={"Delete Notification"}
        description={
          "Are you sure you want to delete this notification? This action cannot be undone."
        }
        onConfirm={toDelete ? () => handleConfirmDelete(toDelete) : null}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
};

export default NotificationsTable;
