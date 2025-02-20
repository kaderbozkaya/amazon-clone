import { IOrderInput } from '@/types'
import { Document, Model, model, models, Schema } from 'mongoose'

export interface IOrder extends Document, IOrderInput {
  _id: string
  //mongoose tarafından oto oluşturulan tarih
  createdAt: Date 
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId as unknown as typeof String,
      ref: 'User',
      required: true,
    },
    //sipariş edilne ürünlerin listesi
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        clientId: { type: String, required: true }, //Ürün ile ilgili müşteri bazlı bir kimlik.
        name: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        color: { type: String },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      province: { type: String, required: true },
      phone: { type: String, required: true },
    },
    expectedDeliveryDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true }, //Ürünlerin toplam fiyatı.
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }, //genel toplam fiyat
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }, //ödeme yapıldıysa tarih bilgisi
    isDelivered: { type: Boolean, required: true, default: false }, //teslim edilip edilmediği
    deliveredAt: { type: Date },
    createdAt: { type: Date, default: Date.now }, //siparişin oluşturulma zamanı
  },
  {
    timestamps: true,
  }
)

//models.order zaten tanımlıysa onu kullan yoksa yeni bir model oluştur
const Order =
  (models.Order as Model<IOrder>) || model<IOrder>('Order', orderSchema)

export default Order