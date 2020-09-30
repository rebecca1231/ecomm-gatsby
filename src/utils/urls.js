require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
export const API_URL = process.env.API_URL || 'http://localhost:1337'