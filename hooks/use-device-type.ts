import { useEffect, useState } from "react";

function useDeviceType() {
    const [deviceType, setDeviceType]=useState('unknown')

    useEffect(()=> {
        //window.innerWidth değerine bakarak ekran genişliği 768 piksel veya daha küçükse mobil daha büyükse desktop olarak güncelleniyor
        const handleResize=()=> { //cihaz tipi belirleniyor
            setDeviceType(window.innerWidth <=768 ? 'mobile':'desktop')
        }
        handleResize()
        window.addEventListener('resize',handleResize)
        return ()=> window.removeEventListener('resize', handleResize) //return içinde removeEventListener kullanarak, bileşen kaldırıldığında olay dinleyicisi kaldırılıyor (Bellek sızıntısını önler).
    },[])

    return deviceType
}
export default useDeviceType