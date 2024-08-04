import CardType from "../interfaces/CardType";
import CommentsType from "../interfaces/CommentsType";
import LikesDisLikesButtons from "./LikesDislikesButtons";
import * as cardApi from "../api/card";
import * as commentApi from "../api/comments";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import CardComment from "./CardComment";
import CommentsInputType from "../interfaces/CommentsInputType";
import { useAppContext } from "../AppContext";
import CreateCardWindow from "./CreateCardWindow";

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = (props) => {
  const useAppState = useAppContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [useViews, setViews] = useState(props.card.views);
  const [useComments, setComments] = useState<CommentsType[] | null>(null);
  // const [useIsFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    cardApi.updateCard(props.card.id, { views: props.card.views + 1 });
    setViews(props.card.views + 1);
    fetchCardComments();
  }, []);

  useEffect(() => {
    fetchCardComments();
  }, [useComments]);

  const fetchCardComments = async () => {
    setComments(await commentApi.fetchCardComments(props.card.id));
  };

  const createCommentClick = async () => {
    if (!textareaRef.current || !useComments) return;
    const comment: CommentsInputType = {
      card_id: props.card.id,
      text: textareaRef.current.value,
    };
    const response = await commentApi.makeNewCardComment(comment);
    useComments.push(response);
    setComments([...useComments]);
    textareaRef.current.value = "";
  };

  return (
    <section className="card">
      <div className="card_content">
        <div className="card__content__front">
          <span>{props.card.front_text}</span>
        </div>
        <div className="card__content__back">
          <span>{props.card.back_text}</span>
        </div>
      </div>
      <LikesDisLikesButtons card_id={props.card.id}></LikesDisLikesButtons>
      <div className="card__views">
        <span>Views</span>
        <span>{useViews}</span>
      </div>
      <div className="card__created_at">
        <span>{moment(props.card.created_at).fromNow()}</span>
      </div>
      <form className="card__new-comment">
        <textarea
          disabled={useAppState.user ? false : true}
          className="card__new-comment__textarea"
          ref={textareaRef}
        ></textarea>
        <button
          type="button"
          className="card__new-comment__button"
          onClick={createCommentClick}
        >
          <span>post</span>
        </button>
      </form>
      <div className="card__comments">
        {useComments &&
          useComments.map((comment, index) => (
            <CardComment key={index} comment={comment}></CardComment>
          ))}
      </div>
      <button disabled={useAppState.user ? false : true}>Create a card</button>
        <div className="card__create">
          <CreateCardWindow
          card={props.card}
        />
      </div>
    </section>
  );
};

export default Card;
