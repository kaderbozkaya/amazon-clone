import type { NextAuthConfig } from 'next-auth' //type


export default {
  providers: [], //kimli doğrulama sağlayıcılarını belirlemek için 
  callbacks: {

    authorized({ request, auth }: any) { //yetkilendirme içim özel bir callback tanımlanıyor.request gelen http istegini temsil eder.auth kullanıcının oturum açıp açmadığını belirten kimlik doğrulama bilgilerini içerir
    

        //Bu dizi düzenli ifadeler (RegExp) içerir, yani belirli URL’ler belirli bir desenle eşleştirilir
      const protectedPaths = [
        /\/checkout(\/.*)?/,
        /\/account(\/.*)?/,
        /\/admin(\/.*)?/,
      ]
      //request.nextUrl.pathname:kullanıcının erişmeye çalıştığı sayfanın yolunu alır.
//Eğer istenen sayfa protectedPaths listesinde varsa, kullanıcının giriş yapmış olup olmadığı kontrol edilir.
 //Eğer giriş yapılmışsa (auth varsa), erişim verilir (return !!auth).
//Eğer giriş yapılmamışsa, erişim engellenir (return false).
      const { pathname } = request.nextUrl
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth
      return true
    },
  },
} satisfies NextAuthConfig //Eğer NextAuthConfig kurallarına aykırı bir şey varsa TypeScript hata verecektir.