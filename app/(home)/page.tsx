import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'
import React from 'react'

export default function Page() {
  return (
    <div>
      <HomeCarousel items={data.carousels}/>
    </div>
  )
}
