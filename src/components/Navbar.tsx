"use client";

import CardNav, { type CardNavItem } from "@/components/CardNav";
import { useCart } from "@/store/cart";

const navItems: CardNavItem[] = [
  {
    label: "Catalog",
    bgColor: "#1f2420",
    textColor: "#ffffff",
    links: [
      {
        label: "All Products",
        ariaLabel: "View all products",
        href: "/products",
      },
      {
        label: "Best Seller",
        ariaLabel: "View best seller products",
        href: "/#products",
      },
    ],
  },
  {
    label: "Preorder",
    bgColor: "#d9d8cf",
    textColor: "#1f2420",
    links: [
      {
        label: "Cart",
        ariaLabel: "Open cart",
        href: "/cart",
      },
      {
        label: "WhatsApp Checkout",
        ariaLabel: "Checkout through WhatsApp",
        href: "/cart",
      },
    ],
  },
  {
    label: "Account",
    bgColor: "#efeee8",
    textColor: "#1f2420",
    links: [
      {
        label: "Login",
        ariaLabel: "Open login page",
        href: "/auth/login",
      },
      {
        label: "Register",
        ariaLabel: "Open register page",
        href: "/auth/register",
      },
    ],
  },
];

export default function Navbar() {
  const items = useCart((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CardNav
      items={navItems}
      logoText="Remocha"
      logoAlt="Remocha"
      baseColor="#f7f7f4"
      menuColor="#1f2420"
      buttonBgColor="#1f2420"
      buttonTextColor="#ffffff"
      buttonLabel="Cart"
      buttonHref="/cart"
      cartCount={totalItems}
      ease="power3.out"
    />
  );
}
