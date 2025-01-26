import { connectToDatabase } from "@/lib/db";
import Product from "@/lib/db/models/product.model";
import { NextRequest, NextResponse } from "next/server"; //Next.js API Routes veya middleware ile çalışmak için kullanılan özel nesneler.NextRequest: Gelen HTTP isteğini temsil eder.nextResponse: Cevap oluşturmak için kullanılır.


export const GET=async(request:NextRequest)=> {
    const listType=request.nextUrl.searchParams.get('type')|| 'history' //isteğin utllindeki type parametresini okur eğer yoksa history değerini kullanır
    const productIdsParam=request.nextUrl.searchParams.get('ids') //urldeki ids parametresini okur 
    const categoriesParam=request.nextUrl.searchParams.get('categories')
    if(!productIdsParam || !categoriesParam){
        return NextResponse.json([]) 
    } //eğer ids veya categorşes parametrelerş eksşkse boş bir json dizisi döndürür bu apinin eksik parametrelerle çalışmamasını sağlar

    //productids ve categoriesteki değerler split ile bir diziye dönüştürülür örn:1,2,3 ["1","2","3"]
    const productIds=productIdsParam.split(',')
    const categories=categoriesParam.split(',')

    //eğer type parametresi history ise sadece productids içinde olan ürünler seçili($in operatörü mongodbdeki bir dizi içindeki değerleri seçmek için kullanılır)
    const filter=
    listType==='history'
    ? {
        _id: {$in:productIds},

    }
    : {
        category:{$in:categories}, _id: {$nin:productIds}
    } //eğer type parametresi history ise sadece productids içindeki olan ürünler seçilir($in operatörü mongodbde bir dizi içindeki değerleri seçmek için kullanılır). type başka bir değerse categories içinde olan ürünler seçilir aynı zamanda productids içinde olmayan($nin) ürünlerde filtrelenir

    
    await connectToDatabase()
    const products=await Product.find(filter)
    //eğer type history ise ürünler productids dizisindeki sıraya göre.productIds.indexOf(a._id.toString()) her ürünün _idsinin productIds dizisindeki sırasını bulur.
    if(listType=== 'history')
        return NextResponse.json(
    products.sort((a,b)=> productIds.indexOf(a._id.toString())- productIds.indexOf(b._id.toString())
    ))
    return NextResponse.json(products) //type history değilse sıralama yapılmaz ve ürünler direkt json formatına döndürülür
}