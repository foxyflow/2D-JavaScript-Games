// import React from 'react'
// import ReactDOM from 'react-dom'

function Page(){ 
    return ( 
    <div class = "intro">
        <img src="./reactlogo.png" width = "40px"></img>
        <h2>Luke's JS Mario levels</h2>
        <h4>Up for the challange?</h4>
        <h6>Click ingame screen and Enter to play</h6>

    </div>
    );
}


ReactDOM.render(
<Page/>,
document.getElementById('root'));




