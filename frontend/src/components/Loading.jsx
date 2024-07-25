import React from 'react';
import '../css/Loading.css';

const Loading = ({error}) => {
    return (
        <>
        {/* <h3 style={{textAlign:'center'}}>Please Wait ...</h3><br></br> */}
        <img style ={{display:'flex',justifyItems:'center',margin:'auto',height:'300px',width:'300px'}} src="https://cdn.simpleicons.org/e/black" alt="" />
        <div className="loading-spinner">
            {error=='' ?<div className="spinner">e shop</div> : <div>{error}</div>}
        </div>
        </>
    );
};

export default Loading;
