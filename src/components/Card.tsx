import React from "react";

type CardProps = {
  title: string;
  headerTone?: "blue" | "amber" | "neutral";
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const tones = {
  blue: "bg-gradient-to-r from-brandBlue-start to-brandBlue-end text-white",
  amber: "bg-gradient-to-r from-accentOrange-start to-accentOrange-end text-white",
  neutral: "bg-gradient-to-r from-warmNeutral-start to-warmNeutral-end text-white"
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
