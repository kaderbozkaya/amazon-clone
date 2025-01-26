'use client'

import useBrowsingHistory from "@/types/hooks/use-browsing-history"
import { useEffect } from "react"

export default function AddToBrowsingHistory({
    id,
    category
}: {
    id:string
    category:string

}) {
    const {addItem}=useBrowsingHistory()
    useEffect(()=> {
        console.log('addItem({id,category})')
        addItem({id,category})
    },[]) //Bu, addItem fonksiyonunun bağımlılık dizisinde olmaması nedeniyle ESLint kuralı olan react-hooks/exhaustive-deps hatasına neden olabilir.
    return null
}
