const endPoint = import.meta.env.VITE_SERVER + "/comments/";

export const fetchCardComments = async (card_id: number) => {
  return await fetch(endPoint);
};
