
import { usePathname } from "next/navigation"
import useDeviceType from "./use-device-type"
import useCartStore from "./use-cart-store"


//belirli sayfalarda sepet kenar cubuğunu gizlemek için
//RegExp (Düzenli İfade) kullanarak s değişkeni belirtilen yollarla eşleşiyorsa false döndürür.
//Eğer s bu yolların dışındaysa, true döndürür.
//! operatörü ile sonuç tersine çevrilmiş.

const isNotInPaths = (s: string) => 
 !/^\/$|^\/cart$|^\/checkout$|^\/sign-in$|^\/sign-up$|^\/order(\/.*)?$|^\/account(\/.*)?$|^\/admin(\/.*)?$/.test(
    s
 )

 //Sepette ürün var mı? → items.length > 0
//Kullanıcı masaüstü cihazda mı? → deviceType === "desktop"
//Mevcut sayfa sepet kenar çubuğunu göstermeye uygun mu? → isNotInPaths(currentPath)
 function useCartSidebar() {
    const {
        cart: {items},
    }=useCartStore()
        const deviceType=useDeviceType()
        const currentPath=usePathname()

        return (
            items.length>0 && deviceType==='desktop' && isNotInPaths(currentPath)
        )
    }

  export default useCartSidebar