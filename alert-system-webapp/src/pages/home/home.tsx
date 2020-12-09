import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import {SetLogout} from "../../data/AuthService";


const Home: React.FC = () => {
    let history = useHistory();

    function handleClick() {
        history.push('/log')
    }

    const Logout = () => {
        if(SetLogout()){
            history.push('/login');
        }
    }

    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <button className={"Home__Button"} onClick={handleClick}>
                Log
            </button>
            <button onClick={ () => Logout()}>
                Logout
            </button>
        </div>
    )
};

export default Home;
