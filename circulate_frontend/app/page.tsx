"use client";

import { Button } from "@/components/components/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button isLoading={isLoading} onClick={handleClick}>
        click me
      </Button>
    </div>
  );
}
