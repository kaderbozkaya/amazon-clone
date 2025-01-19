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