import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin text-primary", className)} />
  );
}
