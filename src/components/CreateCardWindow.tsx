import CreateCardType from "../interfaces/CreateCardType"
import * as cardApi from "../api/card";
import { MouseEventHandler, useRef, useState } from "react";

interface Props {
    card: CreateCardType
}

const CreateCardWindow:React.FC<Props> = (props) => {
    const frontTextRef = useRef<HTMLTextAreaElement>(null);
    const backTextRef = useRef<HTMLTextAreaElement>(null);

    const [chosenCategory, setChosenCategory] = useState<number>(3);

    const CreateCardOnClick = async () => {
        if(!backTextRef.current || !frontTextRef.current) return;
        const card: CreateCardType = {
            back_text: backTextRef.current.value,
            front_text: frontTextRef.current.value,
            category_id: chosenCategory,
            user_id: props.card.user_id,
        };
        const response = await cardApi.createCard(card);
        frontTextRef.current.value = "";
        backTextRef.current.value = "";
    }
    const handleChosenCategory = (num:number) => {
        setChosenCategory(num);
    }

    return <>
        <div className="Card-Creation-Window">
            <textarea ref={frontTextRef}></textarea>
            <textarea ref={backTextRef}></textarea>
            <div className="Category-Choices">
                <button onClick={() => handleChosenCategory(1)}>Joke</button>
                <button onClick={() => handleChosenCategory(2)}>Trivia</button>
                <button onClick={() => handleChosenCategory(3)}>Whatever</button>
            </div>
            <button onClick={CreateCardOnClick}>submit</button>
            <button >cancel</button>
        </div>
    </>
}

export default CreateCardWindow;