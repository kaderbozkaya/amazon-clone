"use server"

import { connectToDatabase } from "../db"
import Product, { IProduct } from "../db/models/product.model"



export async function getAllCategories() {
    await connectToDatabase()
    const categories=await Product.find({isPublished:true}).distinct(
        "category"
    )
  return categories
} //isPublished ile yayınlanmış ürünleri sorgular distinct ile benzersiz kategori isimlerini döndürür yani tekrar eden kategori adlarını filtreler

export async function getProductsForCard({
    tag, //filtrelenecek ürünlerin etiketi
    limit=4, //kaç adet ürün döneceği
}: {
    tag:string
    limit?:number
}) {
    await connectToDatabase()
        const products=await Product.find( {
            tags: {$in:[tag]},isPublished:true}, //etiketler dizisi içinde belştirlen tag değerini içeren ürünleri bulur
            {
                name:1, //sadece ürün adını döndürür. mongodbde 1 döndürmek anlamına gelir
                href:{$concat:["/product/","$slug"]}, //ürün sayfasının bağlantısını /product/{slug} formatında döndürür($concat kullanılarak oluşturuluyor)
                image:{$arrayElemAt:['$images',0]}, //images dizsinin ilk elemanını döndürür
            }
        )
        .sort({createdAt:"desc"}) //son eklenenenden başlayarak sıraya koyar
        .limit(limit) //belitrilen limit kadar döndürür

        //mongodb dokumanlarını json formatına dönüştürür
        return JSON.parse(JSON.stringify(products)) as {
            name:string
            href:string
            image:string
        }[]
    
}

//get product by tag


export async function getProductByTag({
    tag,
    limit=10,
}: {
    tag:string
    limit?:number
}) {
await connectToDatabase()
const products=await Product.find({
    tags:{$in:[tag]},
    isPublished:true
})
.sort({createdAt:"desc"})
.limit(limit)
return JSON.parse(JSON.stringify(products))as IProduct[]
}
