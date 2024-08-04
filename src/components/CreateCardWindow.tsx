import CreateCardType from "../interfaces/CreateCardType"
import * as cardApi from "../api/card";
import { useRef } from "react";

interface Props {
    card: CreateCardType
}

const CreateCardWindow:React.FC<Props> = (props) => {
    const frontTextRef = useRef<HTMLTextAreaElement>(null);
    const backTextRef = useRef<HTMLTextAreaElement>(null);

    const CreateCardOnClick = async () => {
        if(!backTextRef.current || !frontTextRef.current) return;
        const card: CreateCardType = {
            back_text: backTextRef.current.value,
            front_text: frontTextRef.current.value,
            category_id: 3,
            user_id: props.card.user_id,
        };
        const response = await cardApi.createCard(card);
        frontTextRef.current.value = "";
        backTextRef.current.value = "";
    }


    return <>
        <div className="Card-Creation-Window">
            <textarea ref={frontTextRef}></textarea>
            <textarea ref={backTextRef}></textarea>
            <button onClick={CreateCardOnClick}>submit</button>
            <button >cancel</button>
        </div>
    </>
}

export default CreateCardWindow;