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
    { label: "Character", href: "/character" },
    { label: "Clues", href: "/clues" },
  ];

  return (
    <NavigationMenu viewport={false} className="grow-0">
      <NavigationMenuList>
        {menuItems.map(({ label, href }) => (
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
