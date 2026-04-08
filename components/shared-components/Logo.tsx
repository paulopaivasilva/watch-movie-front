import Image from "next/image";
import folderIcon from '@/assets/icons/folder.svg'
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-lg font-semibold text-[22px] text-white", className)}>
      <Image src={folderIcon} alt="logo" width={31} height={31} />
      WATCH
    </div>
  )
}