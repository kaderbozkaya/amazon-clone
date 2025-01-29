'use client'

import useBrowsingHistory from "@/hooks/use-browsing-history"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import ProductSlider from "./product/product-slider"

export default function BrowsingHistoryList({
    className,
}: {
    className?:string
}) {
    const {products}=useBrowsingHistory()
    return(
       products.length !==0 && (
        <div className="bg-background">
            <Separator className={cn('mb-4', className)} />
            <ProductList title={"Related to items that you've viewed"}
            type='related' />
            <Separator className="mb-4" />
            <ProductList 
            title={"Your browsing history"}
            hideDetails
            type='history'
            />
        </div>
       ) 
    )
}

function ProductList({
    title,
    type='history',
    hideDetails=false
}:{
    title:string
    type:'history' | 'related' //'related': Kullanıcının tarama geçmişine göre önerilen ürünler.'history': Kullanıcının tarama geçmişi.
    hideDetails?:boolean
})

{
    const {products}=useBrowsingHistory()
    const [data,setData]=useState([])

    useEffect(()=> {
        const fetchProducts=async()=>{
            const res=await fetch(
                `/api/products/browsing-history?type=${type}&categories=${products.map((product)=>product.category).join(',')}&ids=${products.map((product)=>product.id).join(',')}`
            ) ///api/products/browsing-history API'sine bir istek gönderir. ids: Kullanıcının geçmişindeki ürünlerin kimliklerini alır.
            const data=await res.json()
            setData(data)
        }
        fetchProducts()
    },[products,type]) //products veya type değiştiğinde çalışır

    return(
        data.length>0 &&(
            <ProductSlider title={title} products={data} hideDetails={hideDetails} />
        )
    )
}