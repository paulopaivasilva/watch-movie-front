import SidebarItem from "./sidebar-item";

import HomeIcon from '@/assets/icons/home-icon.svg'
import FavouriteIcon from '@/assets/icons/favourites-icon.svg'
import TrendingIcon from '@/assets/icons/trending-icon.svg'
import CalendarIcon from '@/assets/icons/calendar-icon.svg'
import CommunityIcon from '@/assets/icons/community-icon.svg'
import SocialIcon from '@/assets/icons/social-icon.svg'
import SettingsIcon from '@/assets/icons/settings-icon.svg'
import LogoutIcon from '@/assets/icons/logout-icon.svg'
import { useRouter } from "next/navigation";

interface SidebarContentProps {
  collapsed?: boolean;
}

const menuItems = [
  { label: "Home", icon: HomeIcon, href: '/home' },
  { label: "Favourites", icon: FavouriteIcon, href: '/favourites' },
  { label: "Trending", icon: TrendingIcon, href: '/trending' },
  { label: "Coming soon", icon: CalendarIcon, href: '/coming-soon' },
];

const optionsSocial = [
  { label: "Community", icon: CommunityIcon },
  { label: "Social", icon: SocialIcon },
];

const optionsUser = [
  { label: "Settings", icon: SettingsIcon },
  { label: "Logout", icon: LogoutIcon, href: '/' },
];

export default function SidebarContent({ collapsed }: SidebarContentProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:justify-between gap-14 md:h-[50%] px-4 md:px-0">
      <div className="flex flex-col">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
            onClick={() => router.push(item?.href || '#')}
          />
        ))}
      </div>

      <div className="flex flex-col">
        {optionsSocial.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="flex flex-col">
        {optionsUser.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
            onClick={() => router.push(item?.href || '#')}
          />
        ))}
      </div>
    </div>
  );
}