// // Add the HTML for two buttons (one for T-Swift, one for Yeezy)
// // Add a container element for the card components to be appended to
// // Add cached element references for each of the buttons
// // Add a cached element reference for the container element in the JS file
// // Add event listeners to each of the buttons
// // Write and export functions to access our quote data
// // Import the functions that will access the quote data
// // Ensure the functions that we have built will work as intended.
// TODO: Tweak event listeners so that the quote is stored in a variable
// TODO: Create a test card element with Bootstrap
// TODO: Create a render function
// TODO: Add a function to handle appending a card to the container element
// TODO: Style each card differently, based on who the quote is from
// TODO: Add a button to the card so that we can remove the quote from the array
// TODO: When the delete button is clicked, remove the quote from the array
// TODO: Add responsive design
// TODO: Add Google Fonts
// TODO: Add the HTML for a Light/Dark Mode button.
// TODO: Add light/dark Mode
// TODO: Add a favicon to our site

/*-------------------------------- Constants --------------------------------*/

import { getRandomKanyeQuote, getRandomTaylorQuote } from "../data/quotes.js"

/*-------------------------------- Variables --------------------------------*/

const quotes = []

/*------------------------ Cached Element References ------------------------*/

const swiftBtn = document.querySelector("#swift-button")
const yeezyBtn = document.querySelector("#yeezy-button")
const cardContainer = document.querySelector("#card-container")

/*----------------------------- Event Listeners -----------------------------*/

swiftBtn.addEventListener("click", () => {
  const newTaylorQuote = {
    artist: "T-Swift",
    text: getRandomTaylorQuote()
  }
  quotes.push(newTaylorQuote)
  console.log(quotes);
})

yeezyBtn.addEventListener("click", () => {
  const newKanyeQuote = {
    artist: "Kanye",
    text: getRandomKanyeQuote()
  }
  quotes.push(newKanyeQuote)
  console.log(quotes);
})

/*-------------------------------- Functions --------------------------------*/