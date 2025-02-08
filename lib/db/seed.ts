//MongoDB veritabanını başlatmak (seed) için kullanılır
import { cwd } from 'process' //node.js’in process modülünden gelen cwd (Current Working Directory), çalıştırılan dosyanın bulunduğu klasörü belirtir.
import { loadEnvConfig } from '@next/env'
import { connectToDatabase } from '.'
import data from '../data'
import Product from './models/product.model'
import User from './models/user.model'

loadEnvConfig(cwd()) //.env dosyasındaki ortam değişkenlerini (MONGODB_URI) projeye yükler.

const main = async () => {
  try {
    const { products,users} = data
    await connectToDatabase(process.env.MONGODB_URI)
await User.deleteMany()
const createdUser=await User.insertMany(users)
    await Product.deleteMany() //Product koleksiyonundaki tüm mevcut verileri siler.Eski verilerin üzerine yazılmasını veya karışmasını önlemek için.
    const createdProducts = await Product.insertMany(
      products) //insertMany Mongoose’un bir metodudur ve birden fazla belgeyi aynı anda ekler.
      console.log({
        createdUser,
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
    