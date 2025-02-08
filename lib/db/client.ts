
import { MongoClient, ServerApiVersion } from 'mongodb' //serverapi mongodbnin api sürümünü belirlemek için kullanılıyor

if (!process.env.MONGODB_URI) { //bu bağlantı adresi yoksa bir hata fırlatır
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
//mongodbnin bağlantı seçenekleri

const uri = process.env.MONGODB_URI //bağlantı dizesi
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }, //api sürümü v1 olarak ayarlanıyor ve bazı katı kurallar (strict: true) etkinleştiriliyor. Bu sayede eski özelliklerin kaldırılmasına yönelik uyarılar (deprecationErrors: true) alınabiliyor.

}

let client: MongoClient
//Geliştirme ortamında (NODE_ENV === 'development'), global nesnesine _mongoClient isminde bir MongoDB istemcisi ekleniyor.
//böylece her dosya çağrıldığında yeni bir mongodb istemcisi oluşturulmasının önüne geçiliyor ve gereksiz bağlantılar engelleniyor.
if (process.env.NODE_ENV === 'development') {
 
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
 
  client = new MongoClient(uri, options)
} //üretim ortamında her zaman yeni bir mongodb istemcisi oluşturuluyor global değişkenler üretim ortamında güvenlik açısından önerilmiyor


export default client