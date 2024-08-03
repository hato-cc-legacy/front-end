import moment from "moment";
import CommentsType from "../interfaces/CommentsType";

interface Props {
  comment: CommentsType;
}

const CardComment: React.FC<Props> = (props) => {
  return (
    <div className="card-comment">
      <div className="card-comment__text">
        <span>{props.comment.text}</span>
      </div>
      <div className="card-comment__created_at">
        <span>{moment(props.comment.created_at).fromNow()}</span>
      </div>
    </div>
  );
};

export default CardComment;
