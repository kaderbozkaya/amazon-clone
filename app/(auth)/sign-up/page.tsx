import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SignUpForm from "./signup-form";
//metadata nesnesi, sayfanın başlığını "Sign Up" olarak belirler.Bu, tarayıcının sekme başlığında ve SEO için kullanılan bilgileri içerir.
export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;
  //auth() fonksiyonu kullanıcının oturumunu kontrol eder.eğer kullanıcı zaten giriş yapmışsa, callbackUrl parametresine veya varsayılan olarak ana sayfaya ("/") yönlendirilir.
  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
