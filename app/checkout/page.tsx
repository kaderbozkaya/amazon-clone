import { Metadata } from "next";
import { auth } from "@auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
}; //next.js metadataözelliği ile sayfa başlığı checkout olarak belirleniyor bu seo e tarayıcı sekmesi başlığı için kullanılır
export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    //kullanıcı giriş yapmamışsa sign in'e yönlendirir
    redirect("/sign-in?callbackUrl=/checkout"); //giriş yaptıktan sonra checkout sayfasına yönlendirilir
  }
  return <div>CheckoutPage</div>;
}
