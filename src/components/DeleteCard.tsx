import { useNavigate } from "react-router-dom";
import "./styles/DeleteCard.css";
import { createHeader } from "../util/util";

type Props = {
	backAction(state:boolean): void;
	cardId: number;
}



const DeleteCard: React.FC<Props> = ({backAction,cardId}) => {

	const BACKEND_SERVER = import.meta.env.VITE_SERVER
	const navigate = useNavigate();

	const handleBackAction = () => {
		backAction(false);
	}

	const handleDeleteCard = async () => {
		const header = createHeader('DELETE',{});
		await fetch(BACKEND_SERVER + `/cards/${cardId}`, header);
		navigate("/user");
	};


	return (
		<div className="card__delete_container animate">
			<h1 className="">Are you sure you want to delete this card?</h1>
			<div className="card__delete_container_choices">
				<button className="card__delete_button" onClick={handleDeleteCard}>
					Card is DONE
				</button>
				<button className="card__delete_button" onClick={handleBackAction}>
					NO, my card is forever
				</button>
			</div>
		</div>
	);
};

export default DeleteCard;
