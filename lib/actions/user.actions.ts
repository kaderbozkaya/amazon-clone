/* Bu kod, Next.js’in sunucu bileşenleri (Server Actions) ile kimlik doğrulama işlemlerini yönetmek için NextAuth kullanıyor. Kullanıcı giriş ve çıkış işlemlerini gerçekleştiren signInWithCredentials ve SignOut fonksiyonlarını içeriyor.

*/



'use server'
import bcrypt from 'bcryptjs'
import { signIn, signOut } from "@/auth"
import { IUserSignIn, IUserSignUp } from "@/types"
import { redirect } from "next/navigation"
import { UserSignUpSchema } from "../validator"
import { connectToDatabase } from "../db"
import User from "../db/models/user.model"
import { formatError } from '../utils'


//Kimlik Bilgileri (Credentials) sağlayıcısını kullanarak kullanıcıyı giriş yaptırır.
export async function signInWithCredentials(user:IUserSignIn) {
  return await signIn('credentials', {...user,redirect:false})
} //{...user, redirect: false} → Kullanıcının giriş bilgilerini alır ve sayfa yönlendirmesini devre dışı bırakır (redirect: false).

export const SignOut=async()=> {
    const redirectTo=await signOut({redirect:false})
    redirect(redirectTo.redirect)
}

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  //Kullanıcı Bilgilerini Doğrulama
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    //Kullanıcı Oluşturma
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5), //Kullanıcının şifresi 5 salt değeriyle hashlenir.
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}