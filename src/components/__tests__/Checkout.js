import React from "react"
import renderer from "react-test-renderer"

import Checkout from "../Checkout"

describe("Checkout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Checkout siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})