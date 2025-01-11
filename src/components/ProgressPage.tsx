"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressPage() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-12 padding-x padding-y max-width h-[70vh] flex justify-center items-center">
      <div className="flex flex-col w-full justify-between items-center p-4">
        <Progress value={progress} className="w-[60%]" />
      </div>
    </div>
  );
}
