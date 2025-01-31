import { create } from 'zustand' //zustand store oluşturmak için
import { persist } from 'zustand/middleware' //depolama alanına kaydetmek için

import { Cart, OrderItem } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'

const initialState: Cart = {
  items: [], //sepetteki ürünler
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
}
interface CartState {
    cart:Cart
    addItem: (item: OrderItem, quantity: number) => Promise<string>
  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => void
}

//zustand mağaza tanımlama

const useCartStore = create(
    persist<CartState>(
      (set, get) => ({ //set ile statei güncellemek get ile mevcut statei okumak için
        cart: initialState,
  
        addItem: async (item: OrderItem, quantity: number) => {
          const { items } = get().cart //sepetteki ürünleri al
          //sepette aynı ürün var mı kontrolu
          const existItem = items.find(
            (x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
          )
          //eğer ürün sepette varsa stoku kontrol eder yeni ürün ekliyorsa stok yeterlimi diye bakar
  
          if (existItem) {
            if (existItem.countInStock < quantity + existItem.quantity) {
              throw new Error('Not enough items in stock')
            }
          } else {
            if (item.countInStock < item.quantity) {
              throw new Error('Not enough items in stock')
            }
          }
  //ürün sepette varsa miktarını arttırır.yoksa yeni ürün ekler
          const updatedCartItems = existItem
            ? items.map((x) =>
                x.product === item.product &&
                x.color === item.color &&
                x.size === item.size
                  ? { ...existItem, quantity: existItem.quantity + quantity }
                  : x
              )
            : [...items, { ...item, quantity }]
  //teslimat tarihi ve kargo ücretini hesaplar
          set({
            cart: {
              ...get().cart,
              items: updatedCartItems,
              ...(await calcDeliveryDateAndPrice({
                items: updatedCartItems,
              
              })),
            },
          })
          //sepete eklenen ürününn client id değerini döndürür
          const foundItem = updatedCartItems.find(
            (x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
          )
          if (!foundItem) {
            throw new Error('Item not found in cart')
          }
          return foundItem.clientId
        },
        //güncellemek istenen ürün sepette var mı kontrol edilir yoksa işlem yapılmaz.
        updateItem: async (item: OrderItem, quantity: number) => {
          const { items} = get().cart
          const exist = items.find(
            (x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
          )
          if (!exist) return
          //eğer ürün sepette varsa yeni miktarla güncellenir teslimat ve kargo tekrar hesaplanır.
          const updatedCartItems = items.map((x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
              ? { ...exist, quantity: quantity }
              : x
          )
          set({
            cart: {
              ...get().cart,
              items: updatedCartItems,
              ...(await calcDeliveryDateAndPrice({
                items: updatedCartItems,
            
              })),
            },
          })
        },
        //
        removeItem: async (item: OrderItem) => {
            const { items} = get().cart
        const updatedCartItems = items.filter(
          (x) =>
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size
        )
        set({
          cart: {
            ...get().cart,
            items: updatedCartItems,
            ...(await calcDeliveryDateAndPrice({
              items: updatedCartItems,
            })),
          },
        })
        },
        //sepeti başlangıç durumuna döndürme.sepeti sıfırlar
  init: () => set({ cart: initialState }),
    }),
        
        //zustand store'un persist yapılandırması
        {
            name:'cart-store', //Depolama alanında kullanılacak anahtar adı.
        }
    )
)
export default useCartStore