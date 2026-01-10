import React from "react";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  label?: string;
  to?: string;
};

const BackButton = ({ label = "Back", to }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to, { replace: true });
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-brand shadow-card transition hover:bg-app"
    >
      <span className="text-lg leading-none">←</span>
      {label}
    </button>
  );
};

export default BackButton;
