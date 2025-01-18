import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null } //MongoDB bağlantısını önbelleğe almak (cache'lemek) için kullanılan bir nesnedir. global.mongoose: Daha önce bir bağlantı varsa, onu kullanır.Eğer yoksa, { conn: null, promise: null } varsayılan değerini atar.

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn //Eğer önbellekte (cached.conn) bir bağlantı varsa, tekrar bağlanmaya gerek kalmaz ve mevcut bağlantıyı döndürür.

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing') //MONGODB_URI belirtilmediyse (örneğin .env dosyasında eksikse), bir hata fırlatır.

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI) //daha önce bir bağlantı başlatılmışsa, mevcut bağlantı promise'ını kullanır.yoksa, mongoose.connect() ile yeni bir bağlantı başlatır.aynı anda birden fazla bağlantı isteği gelmesini önler

  cached.conn = await cached.promise //mongoose.connect fonksiyonunun tamamlanmasını bekler ve bağlandığında bağlantıyı cached.conn içine kaydeder

  return cached.conn
}


// global değişkeni, Node.js ortamında tüm uygulama genelinde aynı değerleri paylaşmak için kullanılır.Bu sayede bağlantı nesnesi, her modülde yeniden oluşturulmaz. 