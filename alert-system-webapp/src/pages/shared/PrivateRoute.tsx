import { Route, Redirect } from 'react-router-dom';
import * as React from "react";
import {CheckAuth} from "../../data/AuthService";

export interface PrivateRouteProps {
    component: any;
    route: string;
    redirect: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, route, redirect}) => {
    const routeComponent = (props: any) => (
        CheckAuth()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: redirect}} />);

    return <Route component={routeComponent} path={route}/>;
};
