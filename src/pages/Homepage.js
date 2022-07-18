import React from 'react';

const Homepage = ({
}) => {
  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Space Colonization</h1>
      <div>
        <button className='clickView'>Colonized Planets</button>
        <button className='clickView'>Uncolonized Planets</button>
      </div>
      
    </div>
  </div>
  );
}


export default Homepage;
