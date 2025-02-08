import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CredentialsSignInForm from "./credentials-signin-form";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import SeparatorWithOr from "@/components/shared/separator-or";

export const metadata: Metadata = {
  title: "Sign In", //Tarayıcı sekmesinde "Sign In" başlığı görüntülenecek.
};

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>; //searchParams içinde callbackUrl alınıyor: Kullanıcı giriş yaptığında yönlendirileceği sayfayı belirlemek için.
}) {
  const searchParams = await props.searchParams;

  const { callbackUrl = "/" } = searchParams;
  //Eğer kullanıcı zaten giriş yapmışsa (session varsa), doğrudan callbackUrl sayfasına yönlendirme yapılıyor.
  const session = await auth();
  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialsSignInForm />
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>New to {APP_NAME}</SeparatorWithOr>
      {/* Kullanıcı kayıt olurken de giriş sonrası yönlendirileceği callbackUrl bilgisi korunuyor. */}
      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className="w-full" variant="outline">
          Create your {APP_NAME} account
        </Button>
      </Link>
    </div>
  );
}
