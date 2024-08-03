import CommentsInputType from "../interfaces/CommentsInputType";
const endPoint = import.meta.env.VITE_SERVER + "/comments/";

export const fetchCardComments = async (card_id: number) => {
  return await (await fetch(endPoint + "cards/" + card_id)).json();
};

export const makeNewCardComment = async (comment: CommentsInputType) => {
  return await (
    await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
  ).json();
};
