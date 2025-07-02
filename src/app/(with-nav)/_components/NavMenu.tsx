import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import Link from "next/link";

type Props = { className?: string };

export default function NavMenu({ className }: Props) {
  const menuItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { href: "/characters", label: "PCs" },
    { href: "/clues", label: "Clues" },
    { href: "/crime-scenes", label: "Scenes" },
    { href: "/npcs", label: "NPCs" },
  ];

  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList>
        {menuItems.map(({ href, label }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink asChild>
              <Link href={href}>{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
