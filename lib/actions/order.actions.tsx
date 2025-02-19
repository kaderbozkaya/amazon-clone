import { OrderItem, ShipingAdress } from "@/types";
import { round2 } from "../utils";
import {
  AVAILABLE_DELIVERY_DATES,
  FREE_SHIPPING_MIN_PRICE,
} from "../constants";

export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  deliveryDateIndex?: number; //teslimat tarihi
  items: OrderItem[];
  shippingAddress?: ShipingAdress;
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0) //tüm ürünleri dolaşıp her bir ürünün fiyatını miktarıyla çarpar ve bu değeri toplar
  );
  const deliveryDate =
    AVAILABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ];
  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0
      : deliveryDate.shippingPrice;
  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15); //vergi tutarını hesaplar
  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0) //ürün fiyatı+kargo ücreti+vergi
  );
  return {
    AVAILABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
