import { CardUpdateType } from "../interfaces/CardUpdateType";
import CreateCardType from "../interfaces/CreateCardType";

const endPoint = import.meta.env.VITE_SERVER + "/cards/";

export const updateCard = async (card_id: number, card: CardUpdateType) => {
  return await fetch(endPoint + card_id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card }),
  });
};

export const createCard = async (card: CreateCardType) => {
  return await fetch(endPoint , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card }),
  });
};