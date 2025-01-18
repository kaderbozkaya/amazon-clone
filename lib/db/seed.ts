//MongoDB veritabanını başlatmak (seed) için kullanılır
import { cwd } from 'process' //node.js’in process modülünden gelen cwd (Current Working Directory), çalıştırılan dosyanın bulunduğu klasörü belirtir.
import { loadEnvConfig } from '@next/env'
import { connectToDatabase } from '.'
import data from '../data'
import Product from './models/product.model'

loadEnvConfig(cwd()) //.env dosyasındaki ortam değişkenlerini (MONGODB_URI) projeye yükler.

const main = async () => {
  try {
    const { products} = data
    await connectToDatabase(process.env.MONGODB_URI)

    await Product.deleteMany() //Product koleksiyonundaki tüm mevcut verileri siler.Eski verilerin üzerine yazılmasını veya karışmasını önlemek için.
    const createdProducts = await Product.insertMany(
      products) //insertMany Mongoose’un bir metodudur ve birden fazla belgeyi aynı anda ekler.
      console.log({
        createdProducts,
        message:"Seeded database successfully",
      })
      process.exit(0)
    }catch(error){
        console.error(error)
        throw new Error("Failed to seed database")
    }
}
main() //main fonksiyonunu çağırarak yukarıdaki adımları sırasıyla çalıştırır
    