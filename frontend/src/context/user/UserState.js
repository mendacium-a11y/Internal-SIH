import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

    const host = "http://localhost:5050"
    // const [user, setUser] = useState(null)
    const user = {
        "userId": "e414adfc-3eae-46e8-b925-6d1a78f1bd4c",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNDE0YWRmYy0zZWFlLTQ2ZTgtYjkyNS02ZDFhNzhmMWJkNGMiLCJpYXQiOjE2OTU1NTUxMjd9.UPfBL0XvvnD7PWT_h0cbfHz1XubXyLRWTDF6pCjP5fk",
        "language": "english"
    }
    // const [aiChat, setAiChat] = useState(null)
    const aiChat = [
        {
            "message": "नमस्कार, मैं आपकी कानूनी जरूरतों में कैसे मदद कर सकता हूं?",
            "user": "ai"
        },
        {
            "message": "मैं एक कंपनी पंजीकृत करना",
            "user": "user"
        },
        {
            "message": "एक वकील आप प्रक्रिया के माध्यम से मार्गदर्शन करने में मदद कर सकते हैं",
            "user": "ai"
        }
    ]

    const getuser = async (emailId, password) => {
        try {
            const response = await fetch(`${host}/api/auth/login/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailId, password })
            });

            if (response.ok) {
                const json = await response.json();
                // setUser(json)

            } else {
                // Handle error response
                console.error('Failed to fetch notes:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }


    }

    const getchat = async (message) => {
        try {
            const response = await fetch(`${host}/api/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, user: "userId" })
            });

            if (response.ok) {
                const json = await response.json();
                // setAiChat(json)
            } else {
                // Handle error response
                console.error('Failed to fetch notes:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <UserContext.Provider value={{ getuser, user, aiChat }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;