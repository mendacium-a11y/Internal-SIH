import React, { useContext, useState } from 'react';
import userContext from "../context/user/UserContext";

const QuickService = () => {
    const context = useContext(userContext);
    const { user, proffesional } = context;
    const [selectedLocation, setSelectedLocation] = useState(null); // Set initial location to null

    const handleLocationChange = (event) => {
        const location = event.target.innerText;
        setSelectedLocation(location === "All" ? null : location); // Set selected location to null if "All" is chosen
    };
    

    return (
        <div className='p-3'>
            <div className='text-center'><h2>Rapid Serve</h2></div>
        
            <div className='container'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Location
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleLocationChange}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLocationChange}>Delhi</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLocationChange}>Mumbai</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLocationChange}>Chennai</a></li>
                    </ul>
                </div>

                {proffesional.map((chat) => {
                    if ((selectedLocation === null || selectedLocation === chat.location) && chat.quickService === true && user !== null ) {
                        return (
                            <div className="card my-4" key={chat.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{chat.name}</h5>
                                    <h6 className="card-subtitle my-1 text-body-secondary">{`${chat.yearsOfExperience} Years of Experience`}</h6>
                                    <p className="card-text my-1">{`Location : ${chat.location}`}</p>
                                    <p className="card-text my-1">{`Profession : ${chat.occupation}`}</p>
                                </div>
                            </div>
                        )
                    }
                    return null; // Return null for professionals that don't match the selected location or when no location is selected
                })}
            </div>
        </div>
    )
}

export default QuickService;