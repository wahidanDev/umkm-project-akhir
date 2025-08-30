import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { 
  MessageCircle, 
  Instagram, 
  Music2, 
  ShoppingCart 
} from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Brand & menu desktop */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <RouterLink to="/" className="flex items-center gap-1">
            <img src="/logo-aladdin.png" alt="logo" width={75} />
          </RouterLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <RouterLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                to={item.href}
              >
                {item.label}
              </RouterLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Social + Theme + Login/Logout */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2 items-center">
          <Link isExternal href={siteConfig.links.twitter} title="WhatsApp">
            <MessageCircle className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Instagram">
            <Instagram className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="TikTok">
            <Music2 className="text-default-500" />
          </Link>

          {/* Cart Button */}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="relative"
            onPress={() => navigate('/cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>

          {/* Tombol Login / Logout */}
          {user ? (
            <Button size="sm" color="danger" variant="solid" onPress={logout}>
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              variant="solid"
              onPress={handleLogin}
              className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
