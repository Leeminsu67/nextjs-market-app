import { TUserWithChat } from "@/types";
import React from "react";
import User from "./User";

interface ContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver,
}: ContactsProps) => {
  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userImage || "",
    });
  };
  // console.log(currentUser?.id);
  // console.log(users.filter((user) => user.id !== currentUser?.id));
  return (
    <div className="w-full overflow-auto h-[calc(100vh_-_56px)] border-[1px]">
      <h1 className="m-4 text-2xl font-semibold">Chat</h1>
      <hr />
      <div className="flex flex-col">
        {users.length > 0 &&
          users
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <div
                  key={user.id}
                  onClick={() => {
                    filterMessages(user.id, user.name, user.image);
                    setLayout(true);
                  }}
                >
                  <User user={user} currentUserId={currentUser?.id} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Contacts;
