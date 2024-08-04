import CardType from "../interfaces/CardType";
import CommentsType from "../interfaces/CommentsType";
import LikesDisLikesButtons from "./LikesDislikesButtons";
import * as cardApi from "../api/card";
import * as commentApi from "../api/comments";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import SVGEye from "./assets/Eye";
import CardComment from "./CardComment";
import CommentsInputType from "../interfaces/CommentsInputType";
import { useAppContext } from "../AppContextConst";

import "./styles/Card.css";

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = (props) => {
  const useAppState = useAppContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [useViews, setViews] = useState(props.card.views);
  const [useComments, setComments] = useState<CommentsType[] | null>(null);
  const [useIsCardFront, setIsCardFront] = useState(true);
  const [useIsShowComments, setIsShowComments] = useState(false);

  useEffect(() => {
    cardApi.updateCard(props.card.id, { views: props.card.views + 1 });
    setViews(props.card.views + 1);
    setIsCardFront(true);
    setIsShowComments(false);
    fetchCardComments();
  }, [props]);

  const handleCardFlipToFront = () => {
    setIsCardFront(true);
  };

  const handleCardFlipToBack = () => {
    setIsCardFront(false);
    setIsShowComments(true);
  };

  const fetchCardComments = async () => {
    setComments(await commentApi.fetchCardComments(props.card.id));
  };

  const createCommentClick = async () => {
    if (!textareaRef.current || !useComments || !useAppState.user) return;
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
      <div className="card__content">
        {useIsCardFront && (
          <div className="card__content__front" onClick={handleCardFlipToBack}>
            <span>{props.card.front_text}</span>
          </div>
        )}
        {!useIsCardFront && (
          <div className="card__content__back" onClick={handleCardFlipToFront}>
            <span>{props.card.back_text}</span>
          </div>
        )}
      </div>
      <div className="specs_container">
        <LikesDisLikesButtons card_id={props.card.id}></LikesDisLikesButtons>
        <div className="card__views">
          <span>
            <SVGEye className="svg" />
          </span>
          <span>{useViews}</span>
        </div>
      </div>
      <div className="card__created_at">
        <span>Created {moment(props.card.created_at).fromNow()}</span>
      </div>
      {useIsShowComments && (
        <>
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
        </>
      )}
    </section>
  );
};

export default Card;
