export const COLORS = ['black', 'red', 'silver', 'blue', 'matte gray']
export const ROOF_OPTIONS = ['body color', 'sun roof', 'carbon fiber', 'dual roof']
export const WHEEL_OPTIONS = ['normal', 'carbon fiber', 'body color', 'silver rim']
export const INTERIOR_OPTIONS = ['natural', 'racer', 'technical']

const PRICE_BASE = 25000
const COLOR_PRICE = {
  black: 0,
  red: 500,
  silver: 400,
  blue: 300,
  'matte gray': 700
}
const ROOF_PRICE = {
  'body color': 0,
  'sun roof': 800,
  'carbon fiber': 1500,
  'dual roof': 2000
}
const WHEEL_PRICE = {
  normal: 0,
  'carbon fiber': 1200,
  'body color': 600,
  'silver rim': 800
}
const INTERIOR_PRICE = {
  natural: 0,
  racer: 1500,
  technical: 900
}

export const calcPrice = ({ color, roof, wheels, interior }) => {
  let total = PRICE_BASE
  total += COLOR_PRICE[color] || 0
  total += ROOF_PRICE[roof] || 0
  total += WHEEL_PRICE[wheels] || 0
  total += INTERIOR_PRICE[interior] || 0
  return Number(total.toFixed(2))
}

export const getPriceBreakdown = (car) => ({
  base: PRICE_BASE,
  color: COLOR_PRICE[car.color] || 0,
  roof: ROOF_PRICE[car.roof] || 0,
  wheels: WHEEL_PRICE[car.wheels] || 0,
  interior: INTERIOR_PRICE[car.interior] || 0,
  total: calcPrice(car)
})