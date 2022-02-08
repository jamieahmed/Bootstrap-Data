// // - Add the HTML for two buttons (one for T-Swift, one for Yeezy)
// - Add the HTML for a ‘Mode Swap’ or ‘Dark Mode’ button.
// // - Add a container element for the ‘card’ components to be appended to as children
// // - Add a cached element reference for the container element in the JS file
// // - Add cached element references for each of the buttons
// // - Add event listeners to each of the buttons (test this with a `console.log()`)
// // - Write code to retrieve the data and log the data using `console.log()`
// // - Tweak event listeners so that the quote is stored in a variable (test this with a `console.log()`)
// // - Create a test ‘card’ element with Bootstrap
// // - Create a render function
// // - Add a function to handle appending a ‘card’ containing the quote to the container element.
// // - Style each card differently, based on whether the quote is from T-Swift or Yeezy. (What options do we have to handle this?)
// // - Add a button to the card that will allow us to REMOVE the quote from the list. (What are some approaches we can take to do this?)
// - Add responsive design
// - Add Google Fonts
// - Add Light/Dark Mode

/*-------------------------------- Constants --------------------------------*/

import { getRandomKanyeQuote, getRandomTaylorQuote } from "../data/quotes.js"
// import * as quotes from "../data/quotes.js"

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
  const newQuote = {
    artist: evt.target.id === "swift-button" ? "T-Swift" : "Yeezy",
    text: evt.target.id === "swift-button" ? getRandomTaylorQuote() : getRandomKanyeQuote(),
  }
  quotes.push(newQuote)
  changeFavicon(evt)
  render()
}

function changeFavicon(evt) {
  evt.target.id === "swift-button" 
    ? favicon.setAttribute("href", "/assets/taylor-favicon.png") 
    : favicon.setAttribute("href", "/assets/ye-favicon.png")
}

function deleteQuote(evt) {
  // evt.target.id is delete-btn-1
  const idx = evt.target.id.replace("delete-btn-", "")
  // idx is 1
  quotes.splice(idx, 1)
  render()
}

function render() {
  cardContainer.innerHTML = ""
  quotes.forEach((quote, idx) => {
    appendQuote(quote, idx)
  })
  addDeleteBtnListeners()
}

function appendQuote(quote, idx) {
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

function addDeleteBtnListeners() {
  const deleteQuoteBtns = document.querySelectorAll(".delete-btn")
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