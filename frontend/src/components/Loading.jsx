import React from 'react';
import '../css/Loading.css';

const Loading = ({error}) => {
    return (
        <>
        {/* <h3 style={{textAlign:'center'}}>Please Wait ...</h3><br></br> */}
        <img style ={{alignItems:"center",height:'300px',width:'300px'}} src="https://static.vecteezy.com/system/resources/previews/016/461/442/original/cute-dog-puppy-face-pet-animal-character-with-in-animated-cartoon-illustration-vector.jpg" alt="" />
        <div className="loading-spinner">
            {error=='' ?<div className="spinner">e shop</div> : <div>{error}</div>}
        </div>
        </>
    );
};

export default Loading;
