import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

function AnalyticsTracker() {
    const location = useLocation();
    const { apiFetch } = useFetch();
    
    useEffect(() => {
        apiFetch("/analytics/track-visit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: location.pathname,
            }),
        });
    }, [location.pathname, apiFetch]);
console.log(location.pathname, apiFetch);
    return null;
}

export default AnalyticsTracker;