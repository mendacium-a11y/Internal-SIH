import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

    const host = "http://localhost:5050"
    const [user, setUser] = useState(null)
    const [aiChat, setAiChat] = useState([{
        "message": "Hello, how can I help with your legal needs?",
        "user": "ai"
    }])

    // const [proffesional, setProffesional] = useState(null)
    const proffesional = [
        {
            "id": "4f40f49e-2d3e-43b9-a6fa-5694e4ea67d5",
            "name": "rahul",
            "emailId": "rahul@g.com",
            "password": "$2a$10$1wfW7p.9.p1RIH61.Uf0m.wIDNWrO6i.a6GLJaES9dbDvalI2lsw2",
            "location": "delhi",
            "yearsOfExperience": 5.3,
            "quickService": false,
            "barAssociation": "delhi",
            "createdAt": "2023-09-23T13:42:32.005Z"
        },
        {
            "id": "b8c9dada-2390-4e8c-b220-d8f5fa7c6387",
            "name": "rishabh",
            "emailId": "rishabh@gmail.com",
            "password": "$2a$10$k965AOojh1/r7YYLO7m6LOu7/TfUSpnjGoYGaF1f1Q6xZpScRoQHG",
            "location": "indore",
            "yearsOfExperience": 2.7,
            "quickService": false,
            "barAssociation": "delhi",
            "createdAt": "2023-09-23T14:45:38.716Z"
        },
        {
            "id": "741387ad-df68-4810-aaa0-a283037e56c0",
            "name": "ayush kumar",
            "emailId": "akumar@gmail.com",
            "password": "$2a$10$5Aj3wWpE4jsJdbEkQQNTBOVIJU8WKIlmi/HOEph/ntq6DcEvUgISq",
            "location": "Kolkata",
            "yearsOfExperience": 3.4,
            "quickService": true,
            "barAssociation": "Kolkata",
            "createdAt": "2023-09-24T15:13:17.812Z"
        },
        {
            "id": "9fb9a471-1559-4c00-b349-b5c1fa0ef115",
            "name": "yash gupta",
            "emailId": "yashg@gmail.com",
            "password": "$2a$10$/HMb.Y8cLdFYjaVQ46TjzOi0wZoKJoxR0G31UuE8gS2hxO3hLnlxO",
            "location": "Chennai",
            "yearsOfExperience": 1.8,
            "quickService": true,
            "barAssociation": "CHennai",
            "createdAt": "2023-09-24T15:13:51.462Z"
        },
        {
            "id": "797d7609-9f06-494a-af72-9441261b3b57",
            "name": "Chaitanya Gupta",
            "emailId": "cg@gmail.com",
            "password": "$2a$10$KpbCeMj1kAcLDL6AJNUlaOz48NY.xHrQe65VwyE5lvrwtGkilv9Nm",
            "location": "Delhi",
            "yearsOfExperience": 1.8,
            "quickService": true,
            "barAssociation": "Delhi",
            "createdAt": "2023-09-24T15:14:29.351Z"
        },
        {
            "id": "24320c4d-2e85-4935-aa8a-5d79e6d2a378",
            "name": "Dhruv Singh",
            "emailId": "ds@gmail.com",
            "password": "$2a$10$oU62a26E3WAdLfQwjslMn.Lmtc4uh4vx.pEQ.0TxCAcCb5f1At2/K",
            "location": "Jaipur",
            "yearsOfExperience": 1.8,
            "quickService": false,
            "barAssociation": "Jaipur",
            "createdAt": "2023-09-24T15:14:59.387Z"
        },
        {
            "id": "35920080-f6e6-4714-9e3a-df1f0c481261",
            "name": "Sachin Rastogi",
            "emailId": "sr@gmail.com",
            "password": "$2a$10$B2zICdhaLF59TgRs3YXpROjUIgab9Q7dqJHgumyRW7NAM0RkXdaaK",
            "location": "Lucknow",
            "yearsOfExperience": 1.8,
            "quickService": true,
            "barAssociation": "Lucknow",
            "createdAt": "2023-09-24T15:15:25.601Z"
        },
        {
            "id": "adeee81e-4b18-45b9-a41e-45a99da85047",
            "name": "Aparajita Sheoran",
            "emailId": "as@gmail.com",
            "password": "$2a$10$2YvE8HAIz..bv1vAEXIDteZ1EIABLSxflH.rFtZwKDL39nrii2gPq",
            "location": "Delhi",
            "yearsOfExperience": 1.8,
            "quickService": true,
            "barAssociation": "Delhi",
            "createdAt": "2023-09-24T15:15:51.303Z"
        },
        {
            "id": "35c595a9-321f-4716-85d2-d149fd9f8602",
            "name": "Ishan Kumar",
            "emailId": "ik@gmail.com",
            "password": "$2a$10$J6LMwVnOauFsWSyF8CPtx.oKp0nm9F9VDB93xy.FGfVJ9M5Ok.g8u",
            "location": "Mumbai",
            "yearsOfExperience": 1.8,
            "quickService": false,
            "barAssociation": "Mumbai",
            "createdAt": "2023-09-24T15:16:27.625Z"
        },
        {
            "id": "bdd8ebe9-e0dd-4521-9899-fbff9026c715",
            "name": "Yash Bansal",
            "emailId": "yb@gmail.com",
            "password": "$2a$10$zxVkVMY2DDwchPHRQxYGv..UodDnNFmM9etnzYHFfQXFz8bDhvtRC",
            "location": "Mumbai",
            "yearsOfExperience": 6.6,
            "quickService": true,
            "barAssociation": "Mumbai",
            "createdAt": "2023-09-24T15:16:44.732Z"
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

            getprovider()

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
        console.log(aiChat)
        console.log(user)
        const userMessage = {
            message,
            user: "user"
        }

        setAiChat(aiChat.concat(userMessage))
        console.log("message added")

        try {
            const response = await fetch(`${host}/api/auth/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, user: user.userId })
            });

            if (response.ok) {
                console.log("message sent")
                const json = await response.json();
                const aiResponse = {
                    message: json.response,
                    user: "ai"
                };
                setAiChat(aiChat.concat(aiResponse))




            } else {
                // Handle error response
                console.error('Failed to fetch notes:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    const getprovider = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getallproviders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": user.token
                },
            });
            if (response.ok) {
                const json = await response.json();
                // setProffesional(json)
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
        console.log(proffesional);
        console.log(aiChat);
    }, [user, proffesional, aiChat]);


    return (
        <UserContext.Provider value={{ getuser, user, aiChat, proffesional, getprovider, getchat }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;