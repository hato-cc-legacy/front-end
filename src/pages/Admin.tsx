// import Axios from "axios";
import { useEffect, useState } from "react";
import CardType from "../interfaces/CardType";
import "../components/styles/Admin.css";
import DeleteSVG from "../components/assets/DeleteSVG";

const Admin = () => {
  const [cards, setCards] = useState<CardType[] | null>(null);
  const [comments, setComment] = useState<CardType[] | null>(null);

  useEffect(() => {
    fetchAllCardData(), fetchAllCommentData();
  }, []);

  const fetchAllCommentData = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/comments";
    const response: CardType[] = await (await fetch(endPoint)).json();
    setComment(response);
  };

  const fetchAllCardData = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards";
    const response: CardType[] = await (await fetch(endPoint)).json();
    setCards(response);
  };

  {
    return cards?.map((card: CardType, index: number) => {
      return (
        //Cards
        <div className="admin-container">
          <div className="cards-container" key={index}>
            <span>
              {card.front_text}
              <div className="deleteBtn">
                <button onClick={() => {}}>
                  <DeleteSVG />
                </button>
              </div>
            </span>
          </div>
          {/* Comments */}
          <div className="comments-container">
            {comments?.map((comment: CardType, index: number) => {
              return (
                <div className="comments" key={index}>
                  <span>
                    {comment.text}
                    <div className="deleteBtn">
                      <button className="delete" onClick={() => {}}>
                        <DeleteSVG />
                      </button>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }
};

export default Admin;
