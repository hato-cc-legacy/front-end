import "../components/styles/UserPage.css";
import {useEffect, useState} from "react";

interface UserPageProps {
    userId?: number;
}

interface UserPageCard {
    id: number;
    front_text: string;
    back_text: string;
}

const UserPage: React.FC<UserPageProps> = ({ userId=1 }) => {
    const URL = "http://localhost:5055/";
    const [username, setUsername] = useState<string>("");
    const [cardsByUserId, setCardsbyUserId] = useState<UserPageCard[]>([]);

    useEffect(() => {
        async function getUsername() {
            const response = await fetch (`${URL}/users/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
                }); 
            const responseJSON = await response.json();
            setUsername(responseJSON.username);
        }
    getUsername();}, [userId]);

    useEffect(() => {
    async function getCardsByUserId() {
        const response = await fetch(`${URL}/cards/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json" 
            }
        });
        const responseJSON = await response.json();
        setCardsbyUserId(responseJSON.cardsByUserId); 
        }
    getCardsByUserId();}, [userId]);


    return (<div className="userPage">
        <h1>User Page</h1>
        <h2>User Name</h2>
        <p>User ID: {userId}</p>
        <p>Username: {username}</p>
        <div className="userPageCards">Cards Created: 
            <ul>
            {cardsByUserId.map(card => (
                <li key ={card.id}>
                    {card.back_text} {card.front_text}
                </li>
            ))}
            </ul>
            </div>
        <a href="/">Home</a>
    </div>
    );
}

export default UserPage;