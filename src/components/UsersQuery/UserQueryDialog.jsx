import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, X } from "lucide-react";
import { CallDialog } from "@/components/UsersQuery/CallDialog";
import { useNavigate } from "react-router-dom";
import { createUser, getOrCreateConversation } from "@/lib/chatService";
import { useAuthStore } from "@/store/authStore";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function UserQueryDialog({ open, onOpenChange, data }) {
  if (!data) return null;

  const [callOpen, setCallOpen] = React.useState(false);

  const form = useForm({
    defaultValues: {
      user: data.user || "",
      contact: data.contact || "",
      query: data.query || "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const navigate = useNavigate();
  const authUser = useAuthStore((s) => s.user);

  const handleOpenChat = async () => {
    try {
      // upsert both users
      // current user
      const currentUserId = authUser?.user_id;
      await createUser({
        id: currentUserId,
        name: authUser?.Name,
        avatar: authUser?.avatar || "",
      });

      // target user
      const targetId = data.user_id.user_id;
      await createUser({
        id: targetId,
        name: data.user_id.Name,
        avatar: "",
      });

      const convId = await getOrCreateConversation(currentUserId, targetId);

      // close dialog and navigate to chat page, passing conversation id
      onOpenChange(false);
      if (convId) {
        navigate("/dashboard/chat", { state: { conversationId: convId } });
      } else {
        navigate("/dashboard/chat");
      }
    } catch (err) {
      console.error("Failed to create conversation:", err);
      // still close dialog
      onOpenChange(false);
      navigate("/dashboard/chat");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-h-[90vh] sm:max-w-xl">
          <DialogHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-2xl font-semibold">User's Query</h3>
            </div>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} className="bg-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input readOnly {...field} className="bg-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-500">
                        Query to resolve:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          readOnly
                          {...field}
                          className="h-36 bg-gray-50 resize-none rounded"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <DialogFooter className="grid grid-cols-3 gap-5">
            <Button
              className="rounded border-2 border-primary text-primary"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X size={16} />
              <span>Close</span>
            </Button>
            <Button
              className="rounded bg-blue-500 hover:bg-blue-600"
              onClick={() => setCallOpen(true)}
            >
              <Phone size={16} />
              <span>Call</span>
            </Button>
            <Button className="rounded" onClick={handleOpenChat}>
              <MessageCircle size={16} />
              <span>Chat</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Render the call dialog separately so it can appear on top */}
      <CallDialog
        open={callOpen}
        onOpenChange={setCallOpen}
        contact={data.contact || ""}
      />
    </>
  );
}

// Small inline Call dialog component to show the phone number and a copy action
// CallDialog extracted to its own file `src/components/CallDialog.jsx`
