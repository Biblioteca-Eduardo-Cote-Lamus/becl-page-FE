import { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string;
  icon: ReactNode;
  description: string;
}

export function Card({ title, value, icon, description }: CardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-gray-100 p-3">{icon}</div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
} 