"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";

export default function ClientBody({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  // Optional: Reset body classes on hydration
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  return (
      <div className="antialiased">
        {children}

        {/* Global toast notification system */}
        <Toaster
            position="top-center"
            richColors
            closeButton
            duration={3000}
        />
      </div>
  );
}
