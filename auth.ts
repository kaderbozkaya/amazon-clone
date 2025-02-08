import { MongoDBAdapter } from '@auth/mongodb-adapter' //kullanıcı verilerini mongodbye kaydetmek için nextauthun adaptörünü getiriyor
import bcrypt from 'bcryptjs' //kullanıcı şifrelerini güvenli bir şekilde hashlemek ve karşılaştırmak için 
import CredentialsProvider from 'next-auth/providers/credentials' //kullanıcının eposta ve password giriş yapmasını sağlayan kimlik doğrulama sağlayıcısıdır
import { connectToDatabase } from './lib/db'
import client from './lib/db/client'
import User from './lib/db/models/user.model' //mongodbde kullanıcı modelini temsil eden şema

import NextAuth, { type DefaultSession } from 'next-auth'
import authConfig from './auth.config' //kimlik doğrulama yapılandırmalarını içeren bir dosyayı içe aktarma

declare module 'next-auth' {
  interface Session {
    user: {
      role: string
    } & DefaultSession['user']
  }
}
//handlers: api routes için kullanılan işlemler
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  }, //jwt(jason web token) oturumlar jwt ile yönetiliyor oturu süresi 30 gün olarak belirlenmiş
  adapter: MongoDBAdapter(client),

  //kimlik doğrulama sağlayıcıları
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase()
        if (credentials == null) return null

        const user = await User.findOne({ email: credentials.email })
//eğer kullanıcı varsa şifreyi karşılaştır(bcrypt.compare)
        if (user && user.password) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  //jwt callback
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await connectToDatabase()
          //kullanıcı ilk kez giriş yaptığında eksik bilgleri amalamak için veritabanı güncellenir
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split('@')[0],
            role: 'user',
          })
        }
        token.name = user.name || user.email!.split('@')[0]
        token.role = (user as { role: string }).role
      }
//eğer oturum güncellenirse isim değişiklileri jwtye yansıtılır
      if (session?.user?.name && trigger === 'update') {
        token.name = session.user.name
      }
      return token
    },
    //oturum açıldığında session objesine kullanıcının id role name bilgleri eklenir
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string
      session.user.role = token.role as string
      session.user.name = token.name
      //eğer oturum güncellenirse yeni isim değeri session içine eklenir
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
  },
})