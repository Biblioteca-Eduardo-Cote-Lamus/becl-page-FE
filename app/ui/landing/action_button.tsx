"use client";

import { ArrowRight, Eye } from "lucide-react";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: "arrow" | "eye";
}

export default function ActionButton({ onClick, children, icon = "arrow" }: ActionButtonProps) {
  return (
    <button
      className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
      type="button"
      onClick={onClick}
    >
      {children}
      {icon === "arrow" ? (
        <ArrowRight className="ml-2" />
      ) : (
        <Eye className="ml-2" />
      )}
    </button>
  );
} 