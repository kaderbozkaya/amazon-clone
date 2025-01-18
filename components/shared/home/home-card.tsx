import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type CardItem= {
    title:string
    link: {text:string; href:string}
    items:{ 
        name:string,
        items?:string
        image:string
        href:string
    }[]
}



export default function HomerCard({cards}:{cards:CardItem[]}) {
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
    {cards.map((card)=> (
        <Card key={card.title} className="rounded-none flex flex-col">
            <CardContent className="p-4 flex-1">
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                    {card.items.map((item)=>(
                        <Link key={item.name}
                        href={item.href}
                        className="flex flex-col">
                            <Image src={item.image} alt={item.name} className="aspect-square object-scale-down max-w-full h-auto mx-auto" height={120} width={120}/> {/*aspect-square:en ve boyunun eşit olmasını sağlar(kare oranı). object-scale-down:resmin taşmasını önler */}
                            <p className="text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</p> {/*whitespace-nowrap:metnin bir satırda kalmasını zorunlu yaparız. yani satır kaymasını engelleriz uzun metinlerde taşma olmasın diye tek satırda kalmasını sağla. overflow-hidden taşan metni gizler. text-ellipsis:uzun metinlerin sonuna "..." ekler */}
                        </Link>
                    ))}
                </div>
            </CardContent>
            {card.link && (
                <CardFooter>
                    <Link href={card.link.href} className="mt-4 block">
                    {card.link.text}
                    </Link>
                </CardFooter>
            )}
        </Card>
    ))}
  </div>
  )
}
