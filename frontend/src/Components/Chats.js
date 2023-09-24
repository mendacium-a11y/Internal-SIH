import React, { useState, useContext } from 'react'
import userContext from "../context/user/UserContext";


const Chats = () => {
    const context = useContext(userContext);
    const { aiChat } = context;
    
    


    return (
        <div className='container'>
            {aiChat.map((chat) => {
                return (
                    <div className={` `}>
                        <h3 className={`border-2 p-2 my-5 rounded-3 px-3 ${chat.user === "ai"? "text-start me-5 bg-dark-subtle" : "text-end ms-5 bg-body-secondary"}`}>{chat.message}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Chats