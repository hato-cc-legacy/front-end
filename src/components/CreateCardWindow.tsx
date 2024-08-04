import CreateCardType from "../interfaces/CreateCardType";
import * as cardApi from "../api/card";
import { useRef, useState } from "react";
import { useAppContext } from "../AppContextConst";
import CardType from "../interfaces/CardType";
import Card from "./Card";
interface Props {
  setIsCreatingCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCardWindow: React.FC<Props> = (props) => {
  const useAppState = useAppContext();

  const frontTextRef = useRef<HTMLTextAreaElement>(null);
  const backTextRef = useRef<HTMLTextAreaElement>(null);

  const [useCard, setUseCard] = useState<CardType | null>(null);

  const [chosenCategory, setChosenCategory] = useState<number>(3);

  const CreateCardOnClick = async () => {
    if (!backTextRef.current || !frontTextRef.current || !useAppState.user)
      return;
    const card: CreateCardType = {
      back_text: backTextRef.current.value,
      front_text: frontTextRef.current.value,
      category_id: chosenCategory,
      user_id: useAppState.user.id,
    };
    const response = await cardApi.createCard(card);
    if (response) setUseCard(response);
    frontTextRef.current.value = "";
    backTextRef.current.value = "";
  };
  const handleChosenCategory = (num: number) => {
    setChosenCategory(num);
  };

  return (
    <div className="creating-card-window">
      {useCard ? (
        <div className="creating-card-window__created-Card">
          <Card card={useCard} />
        </div>
      ) : (
        <div className="creating-card-window__card-form">
          <textarea ref={frontTextRef}></textarea>
          <textarea ref={backTextRef}></textarea>
          <div className="creating-card-window__category-Choices">
            <button
              onClick={() => handleChosenCategory(1)}
              className="joke-button"
            >
              Joke
            </button>
            <button
              onClick={() => handleChosenCategory(2)}
              className="trivia-button"
            >
              Trivia
            </button>
            <button
              onClick={() => handleChosenCategory(3)}
              className="whatever"
            >
              Whatever
            </button>
          </div>
          <button onClick={CreateCardOnClick} className="submit-button">
            submit
          </button>
        </div>
      )}
      <button
        onClick={() => props.setIsCreatingCard(false)}
        className="close-button"
      >
        close
      </button>
    </div>
  );
};

export default CreateCardWindow;
