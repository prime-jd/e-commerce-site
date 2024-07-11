import React from 'react';
import '../css/Loading.css';

const Loading = ({error}) => {
    return (
        <div className="loading-spinner">
            {error=='' ?<div className="spinner">e shop</div> : <div>{error}</div>}
        </div>
    );
};

export default Loading;
