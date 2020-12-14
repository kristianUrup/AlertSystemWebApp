import {User} from "./models/User";
import {User as UserModel } from "../models/User";



export const LoginWithNameAndEmail = async (name: string, password: string): Promise<boolean>  => {


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password, name: name })
    };

    const response =  await fetch('http://localhost:7071/api/token', requestOptions );
    if(response.ok){
        const data = await response.json();
        SetToken(data.token);
        SetNameOfUser(data.name);
        SetEmail(data.email);
        return true;
    }
    else {
        return false;
    }
};

export const Headers = () => {
    let header = {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + (sessionStorage.getItem('token') != null ? GetToken() : '')
    };
    return header;
};


export const CheckAuth = (): boolean => {
    const token = GetToken();
    if(token != "" && token != undefined){
        return true;
    }
    return false;
};

export const GetToken = (): string | null => {
    return sessionStorage.getItem('token');
};

export const GetNameOfUser = (): string | null => {
    return  sessionStorage.getItem('name');
};

export const SetToken = (token: string) => {
    sessionStorage.setItem('token', token);
};

export const SetNameOfUser = (name: string) => {
    sessionStorage.setItem('name', name);
};

export const SetEmail = (email: string) => {
    sessionStorage.setItem('email', email);
};

export const SetLogout = (): boolean => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    return true;
};


