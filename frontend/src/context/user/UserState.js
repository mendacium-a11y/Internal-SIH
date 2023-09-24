import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

    const host = "http://localhost:5050"
    const [user, setUser] = useState(null)
    // const user = {
    //     "userId": "e414adfc-3eae-46e8-b925-6d1a78f1bd4c",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNDE0YWRmYy0zZWFlLTQ2ZTgtYjkyNS02ZDFhNzhmMWJkNGMiLCJpYXQiOjE2OTU1NTUxMjd9.UPfBL0XvvnD7PWT_h0cbfHz1XubXyLRWTDF6pCjP5fk",
    //     "language": "english",
    //     "location":"Chennai"
    // }
    const [aiChat, setAiChat] = useState([{
        "message": "Hello, how can I help with your legal needs?",
        "user": "ai"
    }])
    // const aiChat = [
    //     {
    //         "message": "Hello, how can I help with your legal needs?",
    //         "user": "ai"
    //     },
    //     {
    //         "message": "I want to register a company in Delhi, India.",
    //         "user": "user"
    //     },
    //     {
    //         "message": "A lawyer can help guide you through the process",
    //         "user": "ai"
    //     }
    // ]
    // const [proffesional, setProffesional] = useState(null)
    const professionals = [
        {
            "name": "Rahul",
            "location": "Delhi",
            "yearsOfExperience": "5",
            "barAssociation": true,
            "occupation": "Lawyer",
            "quickService": true
        },
        {
            "name": "Priya",
            "location": "Mumbai",
            "yearsOfExperience": "8",
            "barAssociation": false,
            "occupation": "Mediator",
            "quickService": false
        },
        {
            "name": "Amit",
            "location": "Chennai",
            "yearsOfExperience": "3",
            "barAssociation": true,
            "occupation":"Arbitrators",
            "quickService": true
        },
        {
            "name": "Sneha",
            "location": "Chennai",
            "yearsOfExperience": "6",
            "barAssociation": false,
            "occupation":"Notaries",
            "quickService": false
        },
        {
            "name": "Raj",
            "location": "Hyderabad",
            "yearsOfExperience": "10",
            "barAssociation": true,
            "occupation": "Lawyer",
            "quickService": true
        },
        {
            "name": "Neha",
            "location": "Chennai",
            "yearsOfExperience": "4",
            "barAssociation": false,
            "occupation": "Mediator",
            "quickService": false
        },
        {
            "name": "Vikram",
            "location": "Pune",
            "yearsOfExperience": "7",
            "barAssociation": true,
            "occupation":"Notaries",
            "quickService": true
        },
        {
            "name": "Sachin",
            "location": "Chennai",
            "yearsOfExperience": "2",
            "barAssociation": false,
            "occupation":"Arbitrators",
            "quickService": false
        },
        {
            "name": "Anjali",
            "location": "Chennai",
            "yearsOfExperience": "9",
            "barAssociation": true,
            "occupation": "Mediator",
            "quickService": true
        },
        {
            "name": "Aryan",
            "location": "Lucknow",
            "yearsOfExperience": "5",
            "barAssociation": false,
            "occupation":"Arbitrators",
            "quickService": false
        }
    ]


    // const [quickProviders, setQuickProviders] = useState(null)
    const quickProviders = []

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
                setUser(json)

            } else {
                // Handle error response
                console.error('Failed to fetch notes:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }


    }

    const getchat = async (message) => {
        // Create a new message object for the user's message
        const userMessage = {
            message,
            user: "user"
        };
        console.log("get chat invokded")
    
        // Append the user's message to the aiChat state
        setAiChat((aiChat) => [...aiChat, userMessage]);
    
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
    
                // Create a new message object for the AI's response
                const aiResponse = {
                    message: json.message,
                    user: "ai"
                };
    
                // Append the AI's response to the aiChat state
                setAiChat((aiChat) => [...aiChat, aiResponse]);
            } else {
                // Handle error response
                console.error('Failed to fetch notes:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };
    
    

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <UserContext.Provider value={{ getuser, user, aiChat, professionals, getchat }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;