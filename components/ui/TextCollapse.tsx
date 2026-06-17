"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TextCollapse = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const onClick = () => setOpen(!open);

  useEffect(() => {
    const onResize = () => {
      if (contentRef.current && contentRef.current.scrollHeight > contentRef.current.clientHeight) {
        setShowToggle(true);
      } else {
        setShowToggle(false);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn("overflow-hidden transition-all", { "line-clamp-3": !open })}
      >
        {children}
      </div>
      {showToggle && (
        <Button variant="link" className="h-auto cursor-pointer p-0 text-sky-500" onClick={onClick}>
          {open ? "Ẩn bớt" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default TextCollapse;
