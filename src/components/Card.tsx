import React from "react";

type CardProps = {
  title: string;
  headerTone?: "blue" | "amber" | "neutral";
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const tones = {
  blue: "bg-brand-50 text-brand-700",
  amber: "bg-amber-100 text-amber-700",
  neutral: "bg-slate-100 text-slate-700"
};

const Card = ({ title, headerTone = "neutral", children, actions }: CardProps) => {
  return (
    <div className="rounded-2xl bg-white shadow-card">
      <div className={`flex items-center justify-between rounded-t-2xl px-4 py-3 text-sm font-semibold ${tones[headerTone]}`}>
        <span>{title}</span>
        {actions}
      </div>
      <div className="space-y-3 px-4 py-4 text-sm text-slate-600">{children}</div>
    </div>
  );
};

export default Card;
