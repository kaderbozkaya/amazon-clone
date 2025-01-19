import React from 'react'
import { Star } from 'lucide-react'

export default function Rating({
  rating = 0, //değerlendirme yoksa 0
  size = 6, //yıldız boyutu
}: {
  rating: number //gereken bir parametre ör:3.5 gibi bi değerlendirme
  size?: number //opsiyonel bir parametre boyut belirtiyor
}) {
    //dolu,kısmen dolu ve boş türleri hesaplar.math.floor(3.5)=3. kısmı doluluk için 3.5 %1=0.5 eğer partialstar>0 ise kısmen dolu yıldız oluşur. emptystar boş yıldız sayısıdır örn:5-math.ceil(3.5)=1
const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div
      className='flex items-center'
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-${size} h-${size} fill-primary text-primary`}
        />
      ))}
      {partialStar > 0 && (
        <div className='relative'>
          <Star className={`w-${size} h-${size} text-primary`} />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className='w-6 h-6 fill-primary text-primary' />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`w-${size} h-${size}  text-primary`}
        />
      ))}
    </div>
  )
}