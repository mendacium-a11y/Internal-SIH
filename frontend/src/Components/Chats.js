import React, { useState, useContext } from 'react'
import userContext from "../context/user/UserContext";


const Chats = () => {
    const context = useContext(userContext);
    const { aiChat } = context;
    // console.log(aiChat)
    


    return (
        <div className='container'>
            {aiChat.map((chat) => {
                return (
                    <div className={`border-2 p-3 py-5  ${chat.user === "ai"? "text-start" : "text-end"}`}>
                        <h3>{chat.message}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Chats