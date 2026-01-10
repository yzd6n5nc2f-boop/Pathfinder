import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "amber" | "ghost";
};

const variants = {
  primary: "bg-brand-gradient text-white hover:opacity-95",
  secondary: "bg-white text-brand border border-line hover:bg-app",
  amber: "bg-amber-gradient text-white hover:opacity-95",
  ghost: "bg-transparent text-brand hover:bg-app"
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
