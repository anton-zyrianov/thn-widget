export type HotelDataType = {
  checkInDate: string
  checkOutDate: string
  rooms: number
  language: string
  currency: string
  guests: {
    adults: number
    children: number
    totalGuests: number
  }
  minPrice: {
    originalPrice?: number
    promoPrice: number
    discountPercentage?: number
    extras: {
      breakfastIncluded: boolean
      freeCancellation: boolean
    }
  }
  message?: string
}

export type MinPrice = {
  originalPrice?: number
  promoPrice: number
  discountPercentage?: number
  extras: {
    breakfastIncluded: boolean
    freeCancellation: boolean
  }
}
