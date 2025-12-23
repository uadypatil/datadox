import React from 'react';

const PageTransition = ({ children }) => {
    return (
        <div
            className="xyz-in xyz-fade-in-right xyz-ease-out w-full min-h-screen"
              xyz="fade down-20% back-5"
            // xyz="duration-6 short-20% wide-25%"
        >
            {children}
        </div>
    );
};

export default PageTransition;

