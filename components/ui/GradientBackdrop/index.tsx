import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

type Props = PropsWithChildren<{
  className?: string;
  tag?: React.ElementType;
}>;

const GradientBackdrop = ({ children, className, tag: Tag = "section" }: Props) => {
  return (
    <Tag className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          styles["blob-1"],
          "bg-gradient-1 pointer-events-none absolute -top-48 -left-48 -z-10 size-144 rounded-full opacity-20 blur-3xl"
        )}
        aria-hidden
      />
      <div
        className={cn(
          styles["blob-2"],
          "bg-gradient-3 pointer-events-none absolute top-1/4 -right-48 -z-10 size-144 rounded-full opacity-20 blur-3xl"
        )}
        aria-hidden
      />
      <div
        className={cn(
          styles["blob-3"],
          "bg-gradient-2 pointer-events-none absolute bottom-0 -left-40 -z-10 size-128 rounded-full opacity-15 blur-3xl"
        )}
        aria-hidden
      />
      <div
        className={cn(
          styles["blob-4"],
          "bg-gradient-3 pointer-events-none absolute -right-40 bottom-0 -z-10 size-128 rounded-full opacity-15 blur-3xl"
        )}
        aria-hidden
      />

      {children}
    </Tag>
  );
};

export default GradientBackdrop;
