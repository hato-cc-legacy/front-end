// import Axios from "axios";
import { useEffect, useState } from "react";
import CardType from "../interfaces/CardType";
import "../components/styles/Admin.css";
import Reports from "../interfaces/Reports";

// import Card from "../components/Card";
// import CommentsType from "../interfaces/CommentsType";
// import CardComment from "../components/CardComment";
// import { useAppContext } from "../AppContextConst";
import "../components/styles/Users.css";

interface Admin {
  user_id: number;
  text: string;
  card_id: number;
}
const Admin = () => {
  // const [cards, setCards] = useState<CardType[] | null>(null);
  // const [comments, setComment] = useState<CardType[] | null>(null);
  const [reported, setReported] = useState<Reports[] | null>(null);

  useEffect(() => {
    // fetchAllCardData(), fetchAllCommentData();
    fetchReportedThings();
    console.log(reported)
  },[]);

  // const fetchAllCommentData = async () => {
  //   const endPoint = import.meta.env.VITE_SERVER + "/comments";
  //   const response: CardType[] = await (await fetch(endPoint)).json();
  //   setComment(response);
  // };

  // const fetchAllCardData = async () => {
  //   const endPoint = import.meta.env.VITE_SERVER + "/cards";
  //   const response: CardType[] = await (await fetch(endPoint)).json();
  //   setCards(response);
  // };

  const fetchReportedThings = async () => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards-reports/all";
    const fetched = await fetch(endPoint);
    const jsoned: Reports[] | [] = await fetched.json();
    console.log(jsoned)
    setReported(jsoned)
  }

  const deleteCard = async (cardId: string) => {
    const endPoint = import.meta.env.VITE_SERVER + "/cards/" + cardId;
    await fetch(endPoint, { method: "DELETE" })
    //If you want, plus fetchAllCardData method
  }

  const deleteComment = async (commentId: string) => {
    const endPoint = import.meta.env.VITE_SERVER + "/comments/" + commentId;
    await fetch(endPoint, { method: "DELETE" })
    //If you want, plus fetchAllCardData method
  }

  // {
  // return cards?.map((card: CardType, index: number) => {
  //   return (
  //     //Cards
  //     <div className="admin-container">
  //       <div className="cards-container" key={index}>
  //         <h1>
  //           {card.front_text}
  //           <span> Created </span>
  //           <button onClick={() => { }}>Delete</button>
  //           {new Date(card.created_at).toLocaleDateString()}
  //         </h1>

  //         {/* Comments */}
  //         <div className="comments-container">
  //           {comments?.map((comment: CardType, index: number) => {
  //             return (
  //               <div className="comments" key={index}>
  //                 <h3>{comment.text}</h3>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });
  return (reported === null ? null :
    <>
    test
      <div className="admin-container">
        {reported.map((elem) => {
          return (
            <>
            each card
              {
              reported.length === 0 ? null :
                <div className="cards-container" key={elem.card.id + "card"}>
                  {elem.card.back_text}
                  {elem.card.front_text}
                  card_content
                </div>
                }
              {
                elem.card.comments === undefined || elem.card.comments.length === 0 ? null :
                  <div className="comments-container" key={`${elem.card.id}-comment`}>
                    {elem.card.comments.map((elem2) => {
                      return (
                        <>
                        each_comment
                          <div key={elem.card.id + elem2.id}>
                            {elem2.text}
                            comment_content
                          </div>
                        </>
                      )
                    })}
                  </div>
              }
            </>
          )
        })}
      </div>
    </>)
  // }
};

export default Admin;
