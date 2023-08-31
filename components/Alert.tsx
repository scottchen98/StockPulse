import { AlertCircle } from "lucide-react";

import {
  Alert as AlertShadcn,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function Alert({
  variant = "default",
  title,
  description,
}: {
  variant: "default" | "destructive";
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto w-1/2 transform md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 lg:w-1/3">
      <AlertShadcn
        variant={variant}
        className={`${
          variant === "destructive"
            ? "bg-background dark:border-red-500 dark:bg-background dark:text-red-500 dark:shadow-[0_25px_50px_-12px_rgba(255,89,80,0.26);]"
            : "dark:shadow-[0_25px_50px_-12px_rgba(250,250,250,0.25);]"
        } shadow-2xl`}
      >
        {variant === "destructive" && (
          <AlertCircle className="w4 h-4 dark:text-red-500" />
        )}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </AlertShadcn>
    </div>
  );
}
