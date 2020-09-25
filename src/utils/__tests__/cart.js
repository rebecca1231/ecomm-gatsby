import { getCart, saveCart } from "../cart"

test("getCart gets the cart", () => {
  expect(getCart()).toEqual([])
})
const product = { price_in_cent: 1000, qty: 1, strapiId: 1 }



test("setCart item to array", () => {
  expect(saveCart(product)).toEqual(
    { "price_in_cent": 1000, "qty": 1, "strapiId": 1 },
  )
})
