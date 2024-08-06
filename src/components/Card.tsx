import CardType from "../interfaces/CardType";
import CommentsType from "../interfaces/CommentsType";
import LikesDisLikesButtons from "./LikesDislikesButtons";
import * as cardApi from "../api/card";
import * as commentApi from "../api/comments";
import { act, useEffect, useRef, useState } from "react";
import moment from "moment";
import SVGEye from "./assets/Eye";
import CardComment from "./CardComment";
import CommentsInputType from "../interfaces/CommentsInputType";
import { useAppContext } from "../AppContextConst";

import "./styles/Card.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import DeleteCard from "./DeleteCard";

interface Props {
  card: CardType;
  active: boolean;
}

const Card: React.FC<Props> = (props) => {
  const useAppState = useAppContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //If true the card is on the main page and there is comment
  //If false the card is inside userpage and there is no comment but you can edit and delete
  const active = useRef(props.active);
  const [useViews, setViews] = useState(props.card.views);
  const [useComments, setComments] = useState<CommentsType[] | null>(null);
  const [useIsCardFront, setIsCardFront] = useState(true);
  const [useIsShowComments, setIsShowComments] = useState(false);

  //New states for show delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
;
  useEffect(() => {
    
    setViews(props.card.views + 1);
    setIsCardFront(true);
    if (active.current) {
		setIsShowComments(false);
		//Increase the counter only if is on the main page
		cardApi.updateCard(props.card.id, { views: props.card.views + 1 });
	};
    fetchCardComments();
  }, [props]);

  const handleCardFlipToFront = () => {
    setIsCardFront(true);
  };

  const handleCardFlipToBack = () => {
    setIsCardFront(false);
    if (active.current) setIsShowComments(true);
  };

    const handleChangeCardClick = () => {
			alert("I want to be changed!");
		};

  const handleDeleteCardClick = () => {
	setShowDeleteConfirm(true);
  }

  const fetchCardComments = async () => {
    setComments(await commentApi.fetchCardComments(props.card.id));
  };

  const createCommentClick = async () => {
    if (!textareaRef.current || !useComments || !useAppState.user) return;

    const commentText = textareaRef.current.value.trim();

    if (commentText === "") {
      textareaRef.current.classList.add("input-error");
      return;
    } else textareaRef.current.classList.remove("input-error");

    const comment: CommentsInputType = {
      user_id: useAppState.user.id,
      card_id: props.card.id,
      text: textareaRef.current.value,
    };
    const response = await commentApi.makeNewCardComment(comment);
    useComments.unshift(response);
    setComments([...useComments]);
    textareaRef.current.value = "";
  };

  return (
		<section className="card">
			{showDeleteConfirm ? (
				<DeleteCard backAction={setShowDeleteConfirm} cardId={props.card.id}></DeleteCard>
			) : (
				/* Our flip flop */
				<div className="flip-card">
					<div className="flip-card-inner">
						<div className="flip-card-front" onClick={handleCardFlipToBack}>
							<span>{props.card.front_text}</span>
						</div>
						<div className="flip-card-back" onClick={handleCardFlipToFront}>
							<span>{props.card.back_text}</span>
						</div>
					</div>
				</div>
			)}

			<div className="specs_container">
				<LikesDisLikesButtons card_id={props.card.id}></LikesDisLikesButtons>
				<div className="card__views">
					<span>
						<SVGEye className="svg" />
					</span>
					<span>{useViews}</span>
				</div>
				<div className="card__views">
					{!active.current ? (
						<>
							<button
								className="card__delete_button"
								onClick={handleChangeCardClick}
							>
								Edit
							</button>
							<button
								className="card__delete_button"
								onClick={handleDeleteCardClick}
							>
								Delete
							</button>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className="card__created_at">
				<span>Created {moment(props.card.created_at).fromNow()}</span>
			</div>
			<hr />
			{useIsShowComments && (
				<div className="card__comments_section">
					<form className="card__comments_section__new-comment">
						<ReactTextareaAutosize
							placeholder="Enter your comment here!"
							minRows={2}
							disabled={useAppState.user ? false : true}
							className="card__comments_section__new-comment__textarea"
							ref={textareaRef}
						></ReactTextareaAutosize>
						<button
							type="button"
							className="card__comments_section__new-comment__button"
							onClick={createCommentClick}
						>
							post
						</button>
					</form>
					<div className="card__comments_section__comments">
						{useComments &&
							useComments.map((comment, index) => (
								<CardComment key={index} comment={comment}></CardComment>
							))}
					</div>
				</div>
			)}
		</section>
	);
};

export default Card;
