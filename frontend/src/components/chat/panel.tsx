"use client";
import * as React from "react";
import { PromptForm } from "./prompt-form";

export function ChatPanel() {
  return (
    <div className="absolute inset-x-0 bottom-4 w-full md:pl-[10%] md:pr-[11%]">
      <div className="px-2 py-2 shadow-lg md:py-2">
        <PromptForm />
      </div>
    </div>
  );
}
