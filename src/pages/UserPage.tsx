import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import * as cardApi from "../api/card";
import CardType from "../interfaces/CardType";
import Card from "../components/Card";
import * as commentApi from "../api/comments"; // api/comments is not complted yet. Expectin Brian complete it.
import CommentType from "../interfaces/CommentType";
import Comment from "../components/Comment";

const UserPage = () => {
  const useAppState = useAppContext();

  const [useCards, setCards] = useState<CardType[] | null>(null);
  const [useComments, setComments] = useState<CommentType[] | null>(null);


  useEffect(() => {
    fetchCardsByUserId();
  }, []);

  const fetchCardsByUserId = async () => {
    if (useAppState.user) {
      const cards = await cardApi.fetchCardsByUserId(useAppState.user.id);
      setCards(cards);
    }
  };

  useEffect(() => {
    fetchCommentsByUserId();
  }, []);

  const fetchCommentsByUserId = async () => {
    if (useAppState.user) {
      const comments = await commentApi.fetchCommentsByUserId(useAppState.user.id);
      setComments(comments);
    }
  };

  return (
    useAppState.user && (
      <section className="user-page">
        <h2 className="user-page__h2">User Page</h2>
        <div className="user-page__user">
          <div className="user-page__user__id">
            <span>User ID:</span>
            <span>{useAppState.user.id}</span>
          </div>
          <div className="user-page__user__name">
            <span>Username:</span>
            <span>{useAppState.user.username}</span>
          </div>
        </div>
        <div className="user-page__card-history">
          <h3 className="user-page__card-history__h3">Your cards</h3>
          <div className="user-page__card-history__cards">
            {useCards &&
              useCards.map((card, index) => (
                <Card key={index} card={card}></Card>
              ))}
          </div>
        </div>
        <div className="user-page__comment-history">
          <h3 className="user-page__comment-history__h3">Your comments</h3>
          <div className="user-page__comment-history__comments">
            {useComments &&
                useComments.map((comment, index) => (
                  <Comment key={index} comment={comment}></Comment>
                ))}

          </div>

        </div>

      </section>
    )
  );
};

export default UserPage;
