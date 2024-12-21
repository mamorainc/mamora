import * as React from "react";
import Image from "next/image";
import { motion, MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
type Align = "left" | "right";

type ChatItemContainerProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onAnimationStart"
> &
  MotionProps & {
    align: Align;
  };

const ChatItemContainer = React.forwardRef<
  HTMLDivElement,
  ChatItemContainerProps
>(({ className, align, ...props }, ref) => (
  <motion.div
    ref={ref}
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{
      opacity: { duration: 0.2 },
      layout: {
        type: "spring",
        bounce: 0.4,
        duration: 0.85,
      },
    }}
    className={cn(
      "flex w-full items-center justify-center",
      {
        "justify-start": align === "left",
        "justify-end": align === "right",
      },
      className,
    )}
    {...props}
  />
));

ChatItemContainer.displayName = "ChatItemContainer";

type ChatItemProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  align?: Align;
};

const ChatItem = React.forwardRef<HTMLDivElement, ChatItemProps>(
  ({ children, className, align, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-max max-w-[80%] items-start justify-center gap-4 rounded-lg",
          // "flex w-full items-start justify-start gap-4 rounded-lg",
          {
            "flex-row-reverse": align === "right",
          },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ChatItem.displayName = "ChatItem";

type ChatItemSenderAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  icon?: "user" | "assistant";
};
const   ChatItemSenderAvatar = React.forwardRef<
  HTMLDivElement,
  ChatItemSenderAvatarProps
>((props, ref) => {
  const { className, src, icon, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "!aspect-square size-8 rounded-full border-2 border-border bg-[#27272A] sm:size-10 hidden md:flex",
      )}
    >
      {src ? (
        <Image
          src={src}
          width={500}
          height={500}
          alt={`message sender display picture`}
          className={cn(
            "aspect-h-full w-full rounded-full object-cover",
            className,
          )}
          draggable={false}
          {...rest}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full border bg-secondary">
          {icon === "user" ? (
            <User size={20} className="text-secondary-foreground/50" />
          ) : (
            <Bot size={20} className="text-secondary-foreground/50" />
          )}
        </div>
      )}
    </div>
  );
});

ChatItemSenderAvatar.displayName = "ChatItemSenderAvatar";

type ChatItemBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  align?: Align;
};
const ChatItemBody = React.forwardRef<HTMLDivElement, ChatItemBodyProps>(
  ({ align = "left", className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 md:flex-row",
          {
            "items-end": align === "right",
          },
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ChatItemBody.displayName = "ChatItemBody";

type ChatItemContentProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const ChatItemContent = React.forwardRef<HTMLDivElement, ChatItemContentProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start justify-start gap-4 rounded-lg border bg-secondary px-4 py-2",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ChatItemContent.displayName = "ChatItemContent";

type ChatItemHeaderProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const ChatItemHeader = React.forwardRef<HTMLDivElement, ChatItemHeaderProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-start", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ChatItemHeader.displayName = "ChatItemHeader";

type ChatItemFooterProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const ChatItemFooter = React.forwardRef<HTMLDivElement, ChatItemFooterProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div
        ref={ref}
        className={cn("flex items-start justify-start", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
ChatItemFooter.displayName = "ChatItemFooter";

export {
  ChatItemContainer,
  ChatItem,
  ChatItemSenderAvatar,
  ChatItemBody,
  ChatItemHeader,
  ChatItemContent,
  ChatItemFooter,
};
