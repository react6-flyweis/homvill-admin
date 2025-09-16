import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import noNotification from "@/assets/no-notification.svg";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

const SAMPLE = [
  {
    id: 1,
    title: "Headline...",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 2,
    title: "Headline...",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 3,
    title: "Headline...",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 4,
    title: "Headline...",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
];

export function NotificationsDrawer({ children }) {
  const [notifications, setNotifications] = useState(SAMPLE);

  function removeOne(id) {
    setNotifications((s) => s.filter((n) => n.id !== id));
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader className="border-b-2 border-primary/60">
          <SheetTitle className="">Notifications</SheetTitle>
        </SheetHeader>

        <div className="p-5 space-y-3 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <img
                src={noNotification}
                alt="No notifications"
                className="w-48 h-auto mb-6"
              />
              <h3 className="text-lg font-semibold text-foreground">
                No Notifications
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Notification Inbox Empty
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="bg-card rounded-3xl px-3 py-1 shadow-sm flex-col items-start gap-4 border"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{n.title}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOne(n.id)}
                    aria-label={`Delete notification ${n.id}`}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground ">{n.body}</div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <SheetFooter>
            <div className="w-full flex justify-center p-4">
              <button
                onClick={clearAll}
                className="px-6 py-3 border border-red-300 text-red-500 rounded-md hover:bg-red-50"
              >
                Delete All Notifications
              </button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
