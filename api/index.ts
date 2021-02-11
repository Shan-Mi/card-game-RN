import axios from "axios";

const NewDeckURL = "https://deckofcardsapi.com/api/deck/new/shuffle";
const DrawCardsFrom = (deckId: string) =>
  `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`;

export const beginNewGame = async () => await axios.get(NewDeckURL);

export const generateCards = async (deckId: string) =>
  await axios.get(DrawCardsFrom(deckId));

export const drawOneCard = () => {};
