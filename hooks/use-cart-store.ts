import { calcDeliveryDateAndPrice } from "@/lib/actions/order.actions";
import { Cart, OrderItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


const initialState:Cart={
    items:[],
    itemsPrice:0,
    taxPrice:undefined,
    shippingPrice:undefined,
    totalPrice:0,
    paymentMethod:undefined,
    deliveryDateIndex:undefined,
}
interface CartStore {
    cart:Cart
    addItem:(item:OrderItem,quantity:number)=>Promise<string>
}

//zustand mağaza tanımlama

const useCartStore=create(
    //persist sepet durumunun tarayıcıda (ör. localStorage) kalıcı olarak saklanmasını sağlar.
    persist<CartStore>(
        (set,get)=>({
            cart:initialState,

            addItem:async(item:OrderItem,quantity:number)=> {
                const {items}=get().cart
                const existItem=items.find(
                    (x)=>
                        x.product===item.product &&
                    x.color===item.color &&
                    x.size===item.size
                )
                 // Eğer ürün zaten sepette varsa, miktarı güncelle
                if(existItem){
                    if(existItem.countInStock<quantity+existItem.quantity){
                        throw new Error('No enough items in stock')
                    }
                }else {
                    // Ürün sepette değilse, miktarın stokta olup olmadığını kontrol et
                    if(item.countInStock<item.quantity){
                        throw new Error('Not enough items in stock')
                    }
                }
                const updateCartItems=existItem ?
                items.map((x)=>
                x.product===item.product &&
            x.color===item.color &&
            x.size===item.size 
            ?{...existItem,quantity:existItem.quantity+quantity}
            :x
        )
        : [...items,{...item,quantity}]
        // Yeni sepeti durumuna ekle ve fiyatları hesapla
        set({
            cart:{
                ...get().cart,
                items:updateCartItems,
                ...(await calcDeliveryDateAndPrice({
                    items:updateCartItems,
                })), //Güncellenmiş sepeti ve fiyat bilgilerini (calcDeliveryDateAndPrice) hesaplatarak durumu yeniler.
            },
        })

        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
// Eklenen ürünün `clientId` değerini döndür
        return updateCartItems.find(
            (x)=>
                x.product===item.product &&
            x.color===item.color &&
            x.size===item.size
        )?.clientId!
            },
            init:()=>set({cart:initialState}),
        }),
        {
            name:'cart-store', //Depolama alanında kullanılacak anahtar adı.
        }
    )
)
export default useCartStore