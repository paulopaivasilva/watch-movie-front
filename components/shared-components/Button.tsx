import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonLoginProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function ButtonLogin({
  children,
  onClick,
  className,
  disabled,
  type = "button",
}: ButtonLoginProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-[#6100C2] hover:bg-[#4e009e] text-white h-12 w-full rounded-xl text-base font-medium transition-all cursor-pointer",
        className
      )}
    >
      {children}
    </Button>
  );
}