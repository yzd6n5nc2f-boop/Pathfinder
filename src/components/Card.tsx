import React from "react";

type CardProps = {
  title: string;
  headerTone?: "blue" | "amber" | "neutral";
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const tones = {
  blue: "bg-brand-gradient text-white",
  amber: "bg-amber-gradient text-white",
  neutral: "bg-neutral-gradient text-white"
};

const Card = ({ title, headerTone = "neutral", children, actions }: CardProps) => {
  return (
    <div className="rounded-card border border-line bg-surface shadow-card">
      <div
        className={`flex min-h-[42px] items-center justify-between rounded-t-card px-4 py-3 text-sm font-semibold ${tones[headerTone]}`}
      >
        <span>{title}</span>
        {actions}
      </div>
      <div className="space-y-3 px-4 py-4 text-sm text-muted">{children}</div>
    </div>
  );
};

export default Card;
