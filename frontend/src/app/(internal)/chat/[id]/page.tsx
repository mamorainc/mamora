import ChatList from "@/components/chat/list";
import { ChatPanel } from "@/components/chat/panel";
import React from "react";

const Page = () => {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full pt-4">
      <div className="mx-auto flex h-full w-full max-w-full flex-col items-center justify-start gap-10 overflow-y-auto px-4 pb-72 md:px-[10%]">
        <ChatList />
      </div>
      <ChatPanel />
    </div>
  );
};

export default Page;
