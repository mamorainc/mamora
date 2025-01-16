import * as React from "react";
import { PromptForm } from "./prompt-form";

export function ChatPanel() {
  return (
    <div className="absolute inset-x-0 bottom-2 w-full md:bottom-6 md:pl-[10%] md:pr-[11%]">
      <div className="mx-auto max-w-3xl rounded-md border p-4 md:shadow-lg bg-background">
        <PromptForm />
      </div>
    </div>
  );
}
