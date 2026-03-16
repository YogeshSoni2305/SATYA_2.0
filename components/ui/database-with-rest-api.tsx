"use client";

import React from "react";
import { motion } from "framer-motion";
import { Folder, HeartHandshakeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor = "hsl(var(--primary))",
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[280px] w-[200px] items-end justify-center",
        className
      )}
    >
      {/* SVG Paths */}
      <svg
        fill="none"
        height="130"
        viewBox="0 0 200 140"
        width="200"
        className="absolute top-0"
      >
        <path
          d="M 31 0 v 25 q 0 5 5 5 h 59 q 5 0 5 5 v 35"
          className="stroke-border"
        />
        <path
          d="M 77 0 v 20 q 0 5 5 5 h 13 q 5 0 5 5 v 35"
          className="stroke-border"
        />
        <path
          d="M 124 0 v 20 q 0 5 -5 5 h -14 q -5 0 -5 5 v 35"
          className="stroke-border"
        />
        <path
          d="M 170 0 v 25 q 0 5 -5 5 h -60 q -5 0 -5 5 v 35"
          className="stroke-border"
        />
        {/* Animation For Path Starting */}
        <rect
          fill="url(#grad1)"
          height="10"
          rx="5"
          width="10"
          className="database db-light-1"
        />
        {/* Lights */}
        <rect
          fill="url(#grad1)"
          height="10"
          rx="5"
          width="10"
          className="database db-light-1"
        />
        <rect
          fill="url(#grad1)"
          height="10"
          rx="5"
          width="10"
          className="database db-light-2"
          style={{ animationDelay: "1.5s" }}
        />
        <rect
          fill="url(#grad1)"
          height="10"
          rx="5"
          width="10"
          className="database db-light-3"
          style={{ animationDelay: "2s" }}
        />
        <rect
          fill="url(#grad1)"
          height="10"
          rx="5"
          width="10"
          className="database db-light-4"
          style={{ animationDelay: "2.5s" }}
        />
        {/* Buttons */}
        <g>
          {/* First Button */}
          <g>
            <rect fill="hsl(var(--muted))" height="15" rx="3" width="35" x="14" y="0" />
            <rect height="15" rx="3" width="35" x="14" y="0" className="stroke-border" fill="none" />
            <text
              x="31.5"
              y="11"
              textAnchor="middle"
              className="fill-foreground text-[8px] font-medium"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect fill="hsl(var(--muted))" height="15" rx="3" width="35" x="60" y="0" />
            <rect height="15" rx="3" width="35" x="60" y="0" className="stroke-border" fill="none" />
            <text
              x="77.5"
              y="11"
              textAnchor="middle"
              className="fill-foreground text-[8px] font-medium"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect fill="hsl(var(--muted))" height="15" rx="3" width="35" x="107" y="0" />
            <rect height="15" rx="3" width="35" x="107" y="0" className="stroke-border" fill="none" />
            <text
              x="124.5"
              y="11"
              textAnchor="middle"
              className="fill-foreground text-[8px] font-medium"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect fill="hsl(var(--muted))" height="15" rx="3" width="35" x="153" y="0" />
            <rect height="15" rx="3" width="35" x="153" y="0" className="stroke-border" fill="none" />
            <text
              x="170.5"
              y="11"
              textAnchor="middle"
              className="fill-foreground text-[8px] font-medium"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
        </g>
        <g>
          {/* 1 - user list */}
          <g>
            <DatabaseIcon x="26" y="0" />
          </g>
          {/* 2 - task list */}
          <g>
            <DatabaseIcon x="72" y="0" />
          </g>
          {/* 3 - backlogs */}
          <g>
            <DatabaseIcon x="119" y="0" />
          </g>
          {/* 4 - misc */}
          <g>
            <DatabaseIcon x="165" y="0" />
          </g>
          {/* Gradient */}
          <defs>
            <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: lightColor, stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: lightColor, stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </g>
      </svg>
      {/* Main Box */}
      <div className="relative flex h-[150px] w-[150px] flex-col items-center justify-between rounded-xl border border-border bg-card p-4 shadow-lg">
        {/* bottom shadow */}
        <div className="absolute -bottom-1 h-[6px] w-[80%] rounded-b-xl bg-muted" />

        {/* box title */}
        <div className="flex w-full items-center gap-2">
          <Folder className="size-4 text-muted-foreground" />
          <p className="text-xs font-medium text-foreground truncate">
            {title ? title : "REST API"}
          </p>
        </div>

        {/* box outer circle */}
        <div className="relative flex size-12 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
          {circleText ? circleText : "API"}
        </div>

        {/* box content */}
        <div className="relative flex w-full items-center justify-center gap-1.5">
          {/* Badges */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-1">
            <HeartHandshakeIcon className="size-3 text-primary" />
            <span className="text-[8px] font-medium text-foreground">
              {buttonTexts?.first || "Satya"}
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-1">
            <SparklesIcon className="size-3 text-primary" />
            <span className="text-[8px] font-medium text-foreground">
              {buttonTexts?.second || "v2.0"}
            </span>
          </div>

          {/* Circles */}
          <div className="size-2 rounded-full bg-primary/60" />
          <div className="size-2 rounded-full bg-primary/40" />
          <div className="size-2 rounded-full bg-primary/20" />
          <div className="size-2 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

const DatabaseIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg x={x} y={y} width="10" height="12" viewBox="0 0 10 12" fill="none">
      <ellipse cx="5" cy="2.5" rx="4.5" ry="2" className="stroke-muted-foreground" strokeWidth="0.8" />
      <path d="M0.5 2.5v7c0 1.1 2 2 4.5 2s4.5-.9 4.5-2v-7" className="stroke-muted-foreground" strokeWidth="0.8" />
      <ellipse cx="5" cy="6" rx="4.5" ry="1.5" className="stroke-muted-foreground" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
};
