import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2Success() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <div>Logging you in...</div>;
}

export default OAuth2Success;
