import { cartSubtotal, shouldPayShipping, cartTotal } from "../cartTotals"

const cart = [
  { price_in_cent: 1000, qty: 1 },
  { price_in_cent: 500, qty: 2 },
]
test("Subtotal function properly sums cart items", () => {
  expect(cartSubtotal(cart)).toBe(2000)
})

test("shipping function properly determines shipping fee", () => {
    expect(shouldPayShipping(cart)).toBeTruthy()
})

test("cartTotal function properly sums all the values", () => {
    expect(cartTotal(cart)).toBe(2700)
} )

