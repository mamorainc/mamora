"use client";
import * as React from "react";
import { PromptForm } from "./prompt-form";

export function ChatPanel() {
  return (
    <div className="absolute inset-x-0 bottom-2 md:bottom-6 w-full md:pl-[10%] md:pr-[11%]">
      <div className="md:shadow-lg max-w-3xl mx-auto">
        <PromptForm />
      </div>
    </div>
  );
}
