import NextAuth from 'next-auth'
import authConfig from './auth.config'

//auth fonksiyonunu middleware olarak yeniden adlandırıyor.Bu middleware, belirli sayfalara erişimi kontrol etmek için kullanılacak.
export const { auth:middleware}=NextAuth(authConfig)
export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], //Middleware’in Hangi Sayfalarda Çalışacağını Belirleme (matcher)
  }

  //(?!api|_next|.*\\..*) → Aşağıdaki URL'lerde çalışmaması için bir negatif lookahead ifadesi kullanıyor:
//api → Next.js API rotaları (örn: /api/auth/login) middleware tarafından engellenmez.
//_next → Next.js’in dahili dosyaları (_next/static, _next/image, vb.) middleware tarafından işlenmez.
//.*\\..* → Uzantısı olan dosyalar (.js, .css, .png, vb.) middleware tarafından işlenmez.
//'/((?!api|_next|.*\\..*).*)' → Bu kural, tüm sayfa yönlendirmelerini kapsar, ancak yukarıdaki dosya ve dizinleri hariç tutar.