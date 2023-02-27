import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 0;
let page = 1;
let searchQuery = "https://rickandmortyapi.com/api/character";
let nextQuery = null;
let prevQuery = null;

function handlePreviousResults() {
  if (prevQuery !== null) {
    prevButton.removeAttribute("disabled");
    page--;
    fetchCharacters(prevQuery);
  }
}
function handleNextResults() {
  if (nextQuery !== null) {
    nextButton.removeAttribute("disabled");
    page++;
    fetchCharacters(nextQuery);
  }
}

async function fetchCharacters(url) {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data.results:", data.results);
      console.log("data:", data);
      maxPage === 0 ? (maxPage = data.info.pages) : maxPage;
      nextQuery = data.info.next;
      prevQuery = data.info.prev;
      data.results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        cardContainer.append(characterCard);
      });
      pagination.textContent = `${page} / ${maxPage}`;
    }
  } catch (error) {
    console.log(error);
  }
}

fetchCharacters(searchQuery);
prevButton.addEventListener("click", handlePreviousResults);
nextButton.addEventListener("click", handleNextResults);
