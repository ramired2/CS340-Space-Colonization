import React, {useState} from 'react';

const Nations = () => {
  const [viewOpt, setViewOpt] = useState("all");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/nationsedit"
  }

  const viewingOpt = () => {
    var e = document.getElementById("viewOpt");
    // setViewOpt(e.value)

    // console.log(e.value)
    // console.log(viewOpt)
    
    // API call based on options chosen
    // if (e.value == "all") {}
    
    // return data depending on the option chosen
      return <div>
                <div className='indivItem'>
                  <div className='row'>
                    <p className='resItem resHeader'>Nation Name</p>
                    <p className='resItem'>Canada</p>
                    <p className='resItem'>MX</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>Ships Owned</p>
                    <p className='resItem'>3</p>
                    <p className='resItem'>2</p>
                  </div>
                  
                  <div className='row'>
                    <p className='resItem resHeader'>Planets Colonized</p>
                    <p className='resItem'>1</p>
                    <p className='resItem'>3</p>
                  </div>

                  <div className='row'>
                    <p className='resHeader'>Edit</p>
                    {/* need to associate an ID to the indiv edits */}
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                    <button className='btns resItem' onClick={() => {redirToEdit()}}>edit</button>
                  </div>
                </div>
              </div>
    

  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Nations Browsing</h1>

      {/* <button onClick={() => {viewingOpt();}}>see which opt chosen</button> */}

      <div className="dropdownList">
        <select className='dropdown' value ={"all"} id ="viewOpt">
          <option className='view' defaultValue={'all'} value={"all"}>View all Nations</option>
          <option className='view' value={"noShips"}>View nations without ships</option>
          <option className='view' value={"ships"}>View nations with ships</option>
          <option className='view' value={"hasColonized"}>View nations without colonized planets</option>
          <option className='view' value={"noColonized"}>View nations with colonized planets</option>
        </select>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default Nations;
