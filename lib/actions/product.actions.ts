"use server"

import { PAGE_SIZE } from "../constants"

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

//Get one product by slug

export async function getProductBySlug(slug:string) {
    await connectToDatabase()
    const product=await Product.findOne({slug,isPublished:true})
    if(!product) throw new Error("Product not found")
  return JSON.parse(JSON.stringify(product)) as IProduct
}

//aynı kategorideki ilgili ürünleri al

export async function getRelatedProductsByCategory({
    category,
    productId,
    limit=PAGE_SIZE,
    page=1,
}: {
    category:string
    productId:string
    limit?:number
    page:number
}) {
    await connectToDatabase()
    const skipAmount=(Number(page)-1)*limit //sorgunun kaç tane ürünü atlayacağını belirtir.Sayfa 1: Hiçbir ürün atlanmaz (skipAmount = 0).Sayfa 2: İlk limit kadar ürün atlanır. örn page:2 limit=10 ise skipAmount=(2-1)*10=10

    const conditions={
        isPubliched:true,
        category,
        _id:{$ne:productId} //idsi productId olan sonuçlara dahil edilmeyecek.
    }
    const products=await Product.find(conditions)
    .sort({numSales:"desc"}) //ürünleri satış sayısına göre azalan sırada sıralar.
    .skip(skipAmount)
    .limit(limit)
    const productsCount=await Product.countDocuments(conditions) //Koşullara uyan tüm ürünlerin sayısını döndürür. Bu, toplam sayfa sayısını hesaplamak için kullanılır.
    return{
        data:JSON.parse(JSON.stringify(products)) as IProduct[],
        totalPages:Math.ceil(productsCount/limit) //productCount = 45, limit = 10 ise toplam sayfa sayısı 5 olur.
    }
}

