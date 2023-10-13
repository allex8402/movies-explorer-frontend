import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
    if (props.loggedIn === false) {
        return (<Navigate to="/" replace />)
    } else {
        return (<Component {...props} />)
    }
}
export default ProtectedRoute;
