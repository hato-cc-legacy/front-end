import { useEffect, useState } from "react";
import CardType from "../interfaces/CardType";
import Card from "../components/Card";
import CreateCardWindow from "../components/CreateCardWindow";
import { fetchCardsByCategoryId } from "../api/card";

const Index = () => {
  const [useCurrentCard, setCurrentCard] = useState<CardType | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);

  useEffect(() => {
    fetchOneRandomCard();
  }, []);

  const fetchOneRandomCard = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards/random";
    const response: CardType = await (await fetch(endPoint)).json();
    setCurrentCard(response);
  };

  const fetchCardByCategory = async (num: number) => {
    const cardByCategoryId = await fetchCardsByCategoryId(num);
    if(!num) return;
    setCurrentCard(cardByCategoryId[0]);
  }

  return (
    <section className="index">
      {isCreatingCard && (
        <CreateCardWindow setIsCreatingCard={setIsCreatingCard} />
      )}

      <div className="card-control-buttons">
        <button onClick={() => setIsCreatingCard(true)}>Create</button>
        <div className="card-control-buttons__sort-card-options">
          <h2 className="card-control-buttons__sort-card-options__h2">What card do you want?</h2>
          <button onClick={() => fetchCardByCategory(1)}>Jokes</button>
          <button onClick={() => fetchCardByCategory(2)}>Trivia</button>
          <button onClick={() => fetchCardByCategory(3)}>Whatever</button>
        </div>
      </div>
      {useCurrentCard && <Card card={useCurrentCard}></Card>}
    </section>
  );
};

export default Index;
