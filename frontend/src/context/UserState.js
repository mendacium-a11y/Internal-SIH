import { createContext, useState } from "react";

const userContext = createContext()
const [user, setUser] = useState({"user":"", "language":"", "jwt":""})

const getUser = async (credentials) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailId: credentials.email, password: credentials.password })
        });

        if (response.ok) {
            const json = await response.json();
            setUser(user); // Update the state with the response data
        } else {
            // Handle error response
            console.error('Failed to fetch notes:', response.status, response.statusText);
        }

    } catch (error) {

    }
}

return (
    <userContext.Provider value={(getUser)}>
        {props.children}
    </userContext.Provider>
)