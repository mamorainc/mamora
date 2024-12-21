import { CreateChatForm } from "@/components/chat/create-chat-form";

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-6rem)] w-full flex-col items-center justify-center">
      <CreateChatForm />
    </div>
  );
};

export default Page;
