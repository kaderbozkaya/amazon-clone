import { OrderItem } from '@/types'
import { round2 } from '../utils'
import { FREE_SHIPPING_MIN_PRICE } from '../constants'

export const calcDeliveryDateAndPrice=async({
    items,
}: {
    deliveryDateIndex?:number //teslimat tarihi
    items:OrderItem[]
})=>  {
    const itemsPrice=round2(
        items.reduce((acc,item)=> acc+item.price * item.quantity,0) //tüm ürünleri dolaşıp her bir ürünün fiyatını miktarıyla çarpar ve bu değeri toplar
    )
    const shippingPrice=itemsPrice>FREE_SHIPPING_MIN_PRICE ? 0 : 5 //eğer toplam ürün fiyatı ücretsiz kargo sınırından büyükse kargo ücreti 0 olur. değilse 5 olur
    const taxPrice=round2(itemsPrice*0.15) //vergi tutarını hesaplar
    const totalPrice=round2(
        itemsPrice+(shippingPrice  ? round2(shippingPrice):0)+ (taxPrice ? round2(taxPrice):0) //ürün fiyatı+kargo ücreti+vergi
    )
  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  }
}
