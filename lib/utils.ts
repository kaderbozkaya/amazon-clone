import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}
//create toSlug ts arrow function that convert text to lowercase, remove non-word,
// non-whitespace, non-hyphen characters, replace whitespace, trim leading hyphens and trim trailing hyphens

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')

    const CURRENCY_FORMATTER=new Intl.NumberFormat("en-US", {
      currency:"USD",
      style:"currency",
      minimumFractionDigits:2,
    }) //Intl sayıları farklı dillerin ve formatların kurallarina göre biçimlendirmek için kullanılır.currency abd doları $ simgesi ile gösterilecek  style sayıyı para birimi formatında gösterecek.minimumFractionDigits sayı en az iki ondalık basamak içerecek örn:$100.00 
    export function formatCurrency(amount:number){
      return CURRENCY_FORMATTER.format(amount)
    } //formatCurrency(1234.56)=$1,234.56formatCurrency(100)= $100.00

    const NUMBER_FORMATTER=new Intl.NumberFormat("en-US")
    export function formatNumber(number:number){
      return NUMBER_FORMATTER.format(number)
    } //girilen sayıyı adb formatına göre biçimlendirir örn: formatNumber(1000)="1,000"



    export const round2=(num:number)=> 
      Math.round((num+Number.EPSILON)*100)/100 //Number.EPSILON: javascriptteki sayısal işlermlerde hassasiyet kayıplarını(floating-point hatalarını) önlemek için.Number.EPSILON çok küçük bir sayı olup (yaklaşık 2.22e-16), işlemleri daha kesin yapmak için num ile toplanır. 5.678 sayısı 100 ile çarpıldığında 567.8 olur, bu değer Math.round ile 568 olur. 568 değeri tekrar 100'e bölünür ve 5.68 sonucunu verir.


    //24 haneli bir rastgele sayı dizisinden oluşan bir id oluşturmak içn

    export const generateId=()=>
      Array.from({length:24},()=>Math.floor(Math.random()*10)).join('') //uzunluğu 24 olan bir dizi oluşturulur.random ile 0 ve 10 arasında rastgele bir sayı üretilir.floor ile aşağı yuvarlarız sayıyı join ile birleştirip bir string oluştururuz