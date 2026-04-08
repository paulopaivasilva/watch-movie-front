import Image from "next/image";

interface SidebarItemProps {
  label: string;
  icon: string;
  collapsed?: boolean;
  onClick?: () => void
}

export default function SidebarItem({ label, icon, collapsed, onClick }: SidebarItemProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg transition">
      <Image alt={label} src={icon} className="text-blue" />

      {!collapsed && (
        <span className="text-sm text-white/80 hover:text-white">{label}</span>
      )}
    </button>
  );
}