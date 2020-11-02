import React from "react";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <button>
                <Link to="/log">Logs</Link>
            </button>
        </div>
    )
};

export default Home;
