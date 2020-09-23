import { testPathIgnorePatterns } from "../../../jest.config"
import { setCart, getCart, addToCart } from "../cart"
import "../__mocks__/localStorage"

test("getCart function properly retrieves the cart in local storage", () => {
  expect(getCart()).toEqual([])
})
