"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
  wide?: boolean;
}

export function InfoTooltip({ text, wide = false }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-neutral-200 text-neutral-700 cursor-help ml-1">
            <Info className="h-3 w-3" />
          </span>
        </TooltipTrigger>
        <TooltipContent className={wide ? "max-w-sm" : "max-w-xs"}>
          <p className="text-sm">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
