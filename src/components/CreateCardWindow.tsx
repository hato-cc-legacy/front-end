import CreateCardType from "../interfaces/CreateCardType"
import * as cardApi from "../api/card";

interface Props {
    card: CreateCardType
}
const CreateCardWindow:React.FC<Props> = (props) => {

    const CreateCardOnClick = async () => {
        const card: CreateCardType = {
            back_text: 
            front_text: 
            category_id: 
            user_id: 
        };
        const response = await cardApi.createCard(card);
    }


    return <>
        <div className="Card-Creation-Window">
            <textarea></textarea>
            <textarea></textarea>
            <button></button>
            <button></button>
        </div>
    </>
}

export default CreateCardWindow;