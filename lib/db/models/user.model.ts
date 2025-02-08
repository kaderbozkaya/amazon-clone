import { IUserInput } from '@/types'
import { Document, Model, model, models, Schema } from 'mongoose'

export interface IUser extends Document, IUserInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}
//IUser arayüzü Document ve IUserInputı genişletiyor document genişletildiği için Mongooseun sunduğu MongoDB dokuman özelliklerine sahip olur
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: 'User' },
    password: { type: String },
    image: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
//eğer daha önce user modeli tanımlanmışsa onu tekrar oluşturmamak için models.user kullanılıyor. daha önce tanımlanmamışsa yeni bir model oluşturuluyor
/*neden models.User as Model<IUser> kullanılıyor?
Next.js gibi ortamlarda Hot Reloading sırasında modelin tekrar oluşturulmasını önlemek için.
Eğer aynı modeli birden fazla kez tanımlarsak, hata alabiliriz (OverwriteModelError). */
const User = (models.User as Model<IUser>) || model<IUser>('User', userSchema)

export default User