/**
 * The error component is basically a 404 page displayed when no other
 * content applies.
 */
import React from 'react';
import '../styles/index.css'

function Error() {
    return (
        <div className="text-div">
            <p>Error: Page does not exist!</p>
        </div>
    );
}

export default Error;
