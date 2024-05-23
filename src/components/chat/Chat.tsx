import { TUserWithChat } from "@/types";
import React, { useEffect, useRef } from "react";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setLayout: (layout: boolean) => void;
}

const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  // 제일 하단으로 내리기 위한 요소를 만들어서 useRef 속성을 부여
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // 제일 하단으로 내리는 이벤트
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // 페이지가 랜더링 될 때마다 실행
  useEffect(() => {
    scrollToBottom();
  });

  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  );
  // 채팅이 없거나 유저가 없으면 보여주지 않음
  if (!receiver.receiverName || !currentUser) {
    return <div className="w-full h-full"></div>;
  }

  return (
    <div className="w-full">
      <div>
        {/* Chat Header */}
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>
      <div className="flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]">
        {/* Chat Message */}
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === currentUser.id}
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser?.image}
                time={message.createdAt}
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3">
        <Input
          receiverId={receiver?.receiverId}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
};

export default Chat;
