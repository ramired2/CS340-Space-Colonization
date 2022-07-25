import React, {useState} from 'react';

const StarTypes  = () => {
  const [viewOpt, setViewOpt] = useState("all");
  // console.log(viewOpt)

  const redirToEdit = () => {
    window.location.href="http://localhost:3000/startypesedit"
  }

  const deleteData = (id) => {
    // API call
    console.log("wants to delete id: ", id)
  }

  const redirToAdd = () => {
    window.location.href="http://localhost:3000/startypesadd"
    
  }

  const genFormat = () => {
    return <table className='resTable'>
            <thead>
              <tr>
                <td className='resItem resHeader'>Star Type</td>
                <td className='resItem resHeader'>Edit</td>
                <td className='resItem resHeader'>Delete</td>
              </tr>
            </thead>

            {/* would map out data here */}
            <tbody>
              <tr>
                <td className='resItem'>Red Giant Star</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>White Dwarf Star</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className='resItem'>Red Dwarf Star</td>
                <td><button className='btns' onClick={() => {redirToEdit()}}>edit</button></td>
                <td><button className='btns' onClick={() => {deleteData()}}>delete</button></td>
              </tr>
            </tbody>
          </table>
  }

  const viewingOpt = () => {
    // return data depending on the option chosen
    return genFormat()
  }

  return(
  <div className="centerDiv">
    <div className="content">
      <h1 className="subtopic text">Browsing Star Types</h1>

      <p className="description text">Browse through star types known to exsist in the galaxy.</p>

      <div className="dropdownList">
        <select className='dropdown' value ={"all"} id ="viewOpt">
          <option className='view' defaultValue={'all'} value={"all"}>View all star types</option>
        </select>
        <button className='btns adding' onClick={() => {redirToAdd()}}>+</button>
      </div>

      <div className='showingRes'>
        {viewingOpt()}
      </div>
      
    </div>
  </div>
  );
}


export default StarTypes;
