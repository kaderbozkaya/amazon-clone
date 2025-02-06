"use client";

import useCartSidebar from "@/hooks/use-cart-sidebar";
import React from "react";
import CartSidebar from "./cart-sidebar";
import { Toaster } from "../ui/toaster";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode; //React.ReactNode: React bileşenleri, JSX, metin, sayı, dizi, null veya undefined olabilir.yani, children her türlü React içeriğini barındırabilir.
}) {
  const isCartSidebarOpen = useCartSidebar();
  return (
    <>
      {isCartSidebarOpen ? (
        <div className="flex min-h-screen">
          <div className="flex-1 overflow-hidden">{children}</div>
          <CartSidebar />
        </div>
      ) : (
        <div>{children}</div>
      )}
      <Toaster />
    </>
  );
}
