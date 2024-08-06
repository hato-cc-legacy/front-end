import "./styles/CardComment.css";

import moment from "moment";
import CommentsType from "../interfaces/CommentsType";
import SVGReport from "./assets/Report";

interface Props {
  comment: CommentsType;
}
const CardComment: React.FC<Props> = (props) => {
  return (
    <div className="card-comment">
      <div className="card-comment__text">
        <span>{props.comment.text}</span>
        <button className="card-report-flag">
          <span>
            <SVGReport />
          </span>
        </button>
      </div>
      <div className="card-comment__created_at">
        <span>Posted {moment(props.comment.created_at).fromNow()}</span>
      </div>
    </div>
  );
};
export default CardComment;
