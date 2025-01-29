
import {create} from 'zustand' //state management için
import {persist} from 'zustand/middleware' //verilerin localStorage veya sessionStorage gibi kalıcı bir depolama alanına katdedilmesini sağlar

type BrowsingHistory={
    products:{
        id:string
         category:string
        }[]   
}
//products dizisi boş başlar
const initialState:BrowsingHistory={
    products:[]
}
//zustand store oluşturma
export const browsingHistoryStore=create<BrowsingHistory>() (
    persist(()=> initialState, {
        name:'browsingHistoryStore'
    }) //persist verilerin kalıcı hale gelmesini sağlar
)

//custom hook. browsingHistoryStore içindeki producsts durumunu alır ve mağazaya bağlanmayı kolaylaştırır.bu hook tarama geçmişine ürün ekleme veya temizleme gibi işlevler içerir
export default function useBrowsingHistory() {
    const {products}=browsingHistoryStore()
    return {
        products,
        addItem:(
            product:{
                id:string
                category:string
            })=> {
                const index=products.findIndex((p)=>p.id===product.id)
                if(index !==-1) products.splice(index,1)
                    products.unshift(product)
                if(products.length>10) products.pop()
                    browsingHistoryStore.setState({
                products
            })
            },
            clear:()=> {
                browsingHistoryStore.setState({
                    products:[]
                })

            },

    }
} {/*
    addItem bir ürünü tarama geçmişine ekler.
     findIndex yeni eklenmek istenen ürünün products dizisinde olup olmadığını kontrol eder. eğer varsa index !=-1 olur.
     eğer ürün dizide varsa eski kopyasını splice ile sileriz.
     unshift yeni ürün products dizisinin en başına eklenir.
     pop ile dizinin uzunluğu 10u geçerse dizinin sonundaki ürün(en eski ürün) kaldırılır. browsingHistoryStore.setState ile güncellenen products dizisi mağazaya kaydedilir.
      */}