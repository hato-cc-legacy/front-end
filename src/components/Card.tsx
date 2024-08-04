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
  // const [useIsFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    cardApi.updateCard(props.card.id, { views: props.card.views + 1 });
    setViews(props.card.views + 1);
  }, []);

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
      <div className="specs_container">
        <LikesDisLikesButtons card_id={props.card.id}></LikesDisLikesButtons>
        <div className="card__views">
          <span>
            <SVGEye className="svg" />
          </span>
          <span> </span>
          <span>{useViews}</span>
        </div>
      </div>
      <div className="card__created_at">
        <span>{moment(props.card.created_at).fromNow()}</span>
      </div>
      <div className="card__comments"></div>
    </section>
  );
};

export default Card;
