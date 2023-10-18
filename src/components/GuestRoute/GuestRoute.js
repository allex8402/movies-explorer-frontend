import React from "react";
import { Navigate } from "react-router-dom";

function GuestRoute({ component: Component, loggedIn, ...props }) {
    if (loggedIn) {
        return <Navigate to="/" replace />;
    } else {
        return <Component {...props} />;
    }
}

export default GuestRoute;