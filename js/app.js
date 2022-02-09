// // Add the HTML for two buttons (one for T-Swift, one for Yeezy)
// // Add a container element for the card components to be appended to
// // Add cached element references for each of the buttons
// // Add a cached element reference for the container element in the JS file
// // Add event listeners to each of the buttons
// // Write and export functions to access our quote data
// // Import the functions that will access the quote data
// // Ensure the functions that we have built will work as intended.
// // Tweak event listeners so that the quote is stored in a variable
// // Create a test card element with Bootstrap
// // Create a render function
// // Add a function to handle appending a card to the container element
// // Style each card differently, based on who the quote is from
// // Add a button to the card so that we can remove the quote from the array
// // When the delete button is clicked, remove the quote from the array
// // Add responsive design
// // Add Google Fonts
// // Add the HTML for a Light/Dark Mode button.
// // Add light/dark Mode
// TODO: Add a favicon to our site

/*-------------------------------- Constants --------------------------------*/

import { getRandomKanyeQuote, getRandomTaylorQuote } from "../data/quotes.js"

/*-------------------------------- Variables --------------------------------*/

const quotes = []

/*------------------------ Cached Element References ------------------------*/

const swiftBtn = document.querySelector("#swift-button")
const yeezyBtn = document.querySelector("#yeezy-button")
const cardContainer = document.querySelector("#card-container")
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")
const favicon = document.querySelector("#favicon")

/*----------------------------- Event Listeners -----------------------------*/

swiftBtn.addEventListener("click", createQuote)
yeezyBtn.addEventListener("click", createQuote)
lightDarkBtn.addEventListener("click", toggleLightDark)

/*-------------------------------- Functions --------------------------------*/

function createQuote(evt) {
  // isTaylor will be either true or false
  const isTaylor = evt.target.id === "swift-button"
  const newQuote = {
    artist: isTaylor ? "T-Swift" : "Yeezy",
    text: isTaylor ? getRandomTaylorQuote() : getRandomKanyeQuote()
  }
  quotes.push(newQuote)
  changeFavicon(isTaylor)
  render()
}

function changeFavicon(isTaylor) {
  isTaylor 
    ? favicon.setAttribute("href", "/assets/taylor-favicon.png")
    : favicon.setAttribute("href", "/assets/ye-favicon.png")
}

function render() {
  cardContainer.innerHTML = ""
  // quotes is an array of quote objects
  quotes.forEach((quote, idx) => {
    // quote is an object with the shape of:
    // { artist: "artist name", text: "quote" }
    appendQuote(quote, idx)
  })
  addDeleteBtnListeners()
}

function appendQuote(quote, idx) {
  // quote is an object with the shape of:
  // { artist: "artist name", text: "quote" }
  let quoteCard = document.createElement("div")
  quoteCard.classList.add("card", `${quote.artist.toLowerCase()}`)
  quoteCard.innerHTML =
  `<div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>${quote.text}</p>
      <footer class="blockquote-footer text-end artist-name">
        ${quote.artist}
      </footer>
    </blockquote>
  </div>
  <footer class="card-footer">
    <button class="btn delete-btn" id="delete-btn-${idx}">X</button>
  </footer>`
  cardContainer.appendChild(quoteCard)
}

function deleteQuote(evt) {
  const idx = evt.target.id.replace("delete-btn-", "")
  quotes.splice(idx, 1)
  render()
}

function addDeleteBtnListeners() {
  const deleteQuoteBtns = document.querySelectorAll(".delete-btn")
  // 0 is falsy, numbers other than 0 are truthy
  if(deleteQuoteBtns.length) {
    deleteQuoteBtns.forEach(deleteQuoteBtn => {
      deleteQuoteBtn.addEventListener("click", deleteQuote)
    })
  }
}

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

checkDarkPref()