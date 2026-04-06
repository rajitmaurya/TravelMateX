import React from "react";
import "./HotelSkeleton.css";

export const HotelSkeleton = () => {
    return (
        <div className="skeleton-container shadow">
            <div className="skeleton-image"></div>
            <div className="skeleton-details">
                <div className="skeleton-text medium"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-text short"></div>
            </div>
        </div>
    );
};
