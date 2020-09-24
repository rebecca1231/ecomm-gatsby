import { getCart, addToCart, setCart } from "../cart"

test("getCart gets the cart", () => {
  expect(getCart()).toEqual([])
})
const product = { price_in_cent: 1000, qty: 1, strapiId: 1 }

test("addtoCart adds item to array", () => {
  expect(addToCart(product)).toEqual([
    { price_in_cent: 1000, qty: 1, strapiId: 1 },
  ])
})


test("setCart item to array", () => {
  expect(setCart(product)).toEqual(
    { "price_in_cent": 1000, "qty": 1, "strapiId": 1 },
  )
})
