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



  
    export const formatError = (error: any): string => { //error: any parametresi alıyor, yani herhangi bir türde hata nesnesi alabilir.Dönüş tipi string, yani hata mesajını bir string olarak döndürecek.
      if (error.name === 'ZodError') { //gelen hatanın Zod kütüphanesinden olup olmadığını belirler.
        const fieldErrors = Object.keys(error.errors).map((field) => {
          const errorMessage = error.errors[field].message
          return `${error.errors[field].path}: ${errorMessage}` 
        })
        return fieldErrors.join('. ')

        //Eğer hata bir Mongoose ValidationError ise, her hata mesajı ayrı ayrı alınır.
      } else if (error.name === 'ValidationError') {
        const fieldErrors = Object.keys(error.errors).map((field) => {
          const errorMessage = error.errors[field].message
          return errorMessage
        })
        return fieldErrors.join('. ')
        //MongoDB code: 11000, bir duplicate key (benzersiz alanın tekrar girilmesi) hatasıdır.
      } else if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyValue)[0] //error.keyValue içinde hangi alanın tekrarlandığı bilgisi vardır.
        return `${duplicateField} already exists`//Eğer email benzersiz (unique) olacak şekilde tanımlanmışsa ve aynı e-posta ile kayıt yapılmaya çalışılırsa bu hata döner.
      } else {
  //Eğer hata yukarıdaki hiçbir duruma uymuyorsa:
//error.message bir string ise doğrudan döndürülür.
//Değilse JSON formatında stringleştirilerek döndürülür.
        return typeof error.message === 'string'
          ? error.message
          : JSON.stringify(error.message)
      }
    }



    export function calculateFutureDate(days: number) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() + days)
      return currentDate
    }
    export function getMonthName(yearAndMonth: string) {
      const [year, monthNumber] = yearAndMonth.split('-')
      const date = new Date()
      date.setMonth(parseInt(monthNumber)-1)
    return new Date().getMonth()===parseInt(monthNumber)-1
    ? `${date.toLocaleString('default', {month:'long'})} (ongoing)`
    :date.toLocaleString('default',{month:'long'})
    }

    export function calculatePastDate(days: number) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - days)
      return currentDate
    }


    export function timeUntilMidnight(): { hours: number; minutes: number } {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0) // Set to 12:00 AM (next day)
    
      const diff = midnight.getTime() - now.getTime() // Difference in milliseconds
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
      return { hours, minutes }
    }
    


    export const formatDateTime = (dateString: Date) => {
      const dateTimeOptions: Intl.DateTimeFormatOptions = {
        month: 'short', // abbreviated month name (e.g., 'Oct')
        year: 'numeric', // abbreviated month name (e.g., 'Oct')
        day: 'numeric', // numeric day of the month (e.g., '25')
        hour: 'numeric', // numeric hour (e.g., '8')
        minute: 'numeric', // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
      }
      const dateOptions: Intl.DateTimeFormatOptions = {
        // weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
        month: 'short', // abbreviated month name (e.g., 'Oct')
        year: 'numeric', // numeric year (e.g., '2023')
        day: 'numeric', // numeric day of the month (e.g., '25')
      }
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric', // numeric hour (e.g., '8')
        minute: 'numeric', // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
      }
      const formattedDateTime: string = new Date(dateString).toLocaleString(
        'en-US',
        dateTimeOptions
      )
      const formattedDate: string = new Date(dateString).toLocaleString(
        'en-US',
        dateOptions
      )
      const formattedTime: string = new Date(dateString).toLocaleString(
        'en-US',
        timeOptions
      )
      return {
        dateTime: formattedDateTime,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
      }
    }