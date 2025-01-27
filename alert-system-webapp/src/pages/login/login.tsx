import React, {useState} from "react";
import './login.css';
import {LoginWithNameAndEmail} from "../../data/AuthService";
import {useHistory} from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    const onClickLogin = (username: string, password: string) => {
        LoginWithNameAndEmail(username, password).then(success => {
            if (success) {
                history.push('/');
            }
        });
    };
    return (
        <div className="login__outer-ring">
            <h1 className="login__header"> Login page </h1>
            <table className="login__table">
                <tbody>
                <tr>
                    <td><h3>Username:</h3></td>
                    <td><input onChange={input => setUsername(input.target.value)}/></td>
                </tr>
                <tr>
                    <td><h3>Password:</h3></td>
                    <td><input type="password" name={password} onChange={input => setPassword(input.target.value)} /></td>
                </tr>
                <tr>
                    <td>
                        <button className="login__login-btn" onClick={() => onClickLogin(username, password)}> Login</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};


export default Login;
