import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";


const Home: React.FC = () => {
    let history = useHistory();

    function handleClick() {
        history.push('/log')
    }

    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <button className={"Home__Button"} onClick={handleClick}>
                Log
            </button>
        </div>
    )
};

export default Home;
