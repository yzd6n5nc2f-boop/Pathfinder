import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "amber" | "ghost";
};

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50",
  amber: "bg-amber-500 text-white hover:bg-amber-600",
  ghost: "bg-transparent text-brand-700 hover:bg-brand-50"
};

const Button = ({ className = "", variant = "primary", ...props }: ButtonProps) => (
  <button
    className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
      variants[variant]
    } ${className}`}
    {...props}
  />
);

export default Button;
