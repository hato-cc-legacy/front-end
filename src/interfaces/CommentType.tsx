import { CommentUpdateType } from "./CommentUpdateType";

export default interface CommentType extends CommentUpdateType {
  id: number;
  card_id: number;
  user_id: number;
  text: string;
  created_at: string;
  updated_at: string;
}