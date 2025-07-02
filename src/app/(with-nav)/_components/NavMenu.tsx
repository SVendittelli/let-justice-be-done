import {
  NavigationMenu,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import Link from "next/link";

export default function NavMenu() {
  const menuItems: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
    { href: "/character", label: "Character" },
    { href: "/clues", label: "Clues" },
    { href: "/crime-scenes", label: "Crime Scenes" },
    { href: "/npcs", label: "NPCs" },
  ];

  return (
    <NavigationMenu viewport={false} className="grow-0">
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
