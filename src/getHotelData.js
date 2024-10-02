// https://www.centarahotelsresorts.com/centaragrand/cpbr

function handleError(message) {
  console.error(message)
  throw new Error(message)
}

function extractTextContent(selector, errorMessage) {
  const element = document.querySelector(selector)
  if (!element) handleError(errorMessage)

  return element.textContent?.trim() || ''
}

function extractMinPriceData(priceElements) {
  let minPriceData = null

  priceElements.forEach((el) => {
    const originalPriceText = extractTextContent(
      '.thumb-cards_originalPrice',
      'Original price not found'
    )
    const promoPriceText = extractTextContent(
      '.thumb-cards_price',
      'Promotional price not found'
    )

    const originalPriceValue = parseFloat(
      originalPriceText.replace(/[^0-9.]/g, '') || '0'
    )
    const promoPriceValue = parseFloat(
      promoPriceText.replace(/[^0-9.]/g, '') || '0'
    )

    if (!minPriceData || promoPriceValue < minPriceData.promoPrice) {
      const discountPercentage =
        originalPriceValue > 0
          ? Math.round(
              ((originalPriceValue - promoPriceValue) / originalPriceValue) *
                100
            )
          : 0

      const freeCancellationElement = el.querySelector('.product-icons_check')
      const breakfastElement = el.querySelector('.product-icons_coffee')

      minPriceData = {
        originalPrice: originalPriceValue,
        promoPrice: promoPriceValue,
        discountPercentage: discountPercentage,
        extras: {
          freeCancellation: freeCancellationElement ? true : false,
          breakfastIncluded: breakfastElement ? true : false,
        },
      }
    }
  })

  if (!minPriceData)
    handleError('No valid prices found in the provided elements')

  return minPriceData
}

export function getAvailabilityPageData() {
  try {
    const isAvailabilityPage = document.location.href.indexOf(
      'https://be.synxis.com/'
    )
    const isAvailabilityDate = document.querySelector(
      '.product-availability-container_unavailableMessage'
    )

    if (isAvailabilityPage === -1) {
      handleError('You are not on the availability page')
    }

    if (isAvailabilityDate)
      handleError('No rooms are available for the selected dates')

    const params = new URLSearchParams(document.location.search)

    const priceElements = document.querySelectorAll('.thumb-cards_details')
    const minPriceData = extractMinPriceData(priceElements)

    const totalGuests =
      Number(params.get('adult')) + Number(params.get('child'))

    const locale =
      params.get('locale')?.slice(0, 2) || document.documentElement.lang

    return {
      checkInDate: params.get('arrive'),
      checkOutDate: params.get('depart'),
      minPrice: minPriceData,
      currency: params.get('currency'),
      rooms: params.get('rooms'),
      guests: {
        adults: Number(params.get('adult')),
        children: Number(params.get('child')),
        totalGuests,
      },
      language: locale,
    }
  } catch (error) {
    console.error(error.message)
    return error
  }
}
