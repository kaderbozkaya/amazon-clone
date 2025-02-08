/* Bu kod, Next.js’in sunucu bileşenleri (Server Actions) ile kimlik doğrulama işlemlerini yönetmek için NextAuth kullanıyor. Kullanıcı giriş ve çıkış işlemlerini gerçekleştiren signInWithCredentials ve SignOut fonksiyonlarını içeriyor.

*/



'use server'

import { signIn, signOut } from "@/auth"
import { IUserSignIn } from "@/types"
import { redirect } from "next/navigation"


//Kimlik Bilgileri (Credentials) sağlayıcısını kullanarak kullanıcıyı giriş yaptırır.
export async function signInWithCredentials(user:IUserSignIn) {
  return await signIn('credentials', {...user,redirect:false})
} //{...user, redirect: false} → Kullanıcının giriş bilgilerini alır ve sayfa yönlendirmesini devre dışı bırakır (redirect: false).

export const SignOut=async()=> {
    const redirectTo=await signOut({redirect:false})
    redirect(redirectTo.redirect)
}
