import React, {useState} from 'react';
// import axios from 'axios';

const AddStarTypes = (props) => {
    //   const [parent, setParent] = useState("");
    //   const [nationID, setNationID] = useState(null);
      const [type, setType] = useState("");
    
    //   // return page
      let link = "http://localhost:3000/startypes"
    
    //   const history_ = useHistory();
    
    //   // API call for creating a new tree
      const createEmpty = async(e) => {
    
    //     e.preventDefault();
    //     // await axios.post('http://localhost:5000/', {
    //     //   method:'POST',
    //     //   headers: { 'Content-Type': 'application/json'},
    //     //   nationID: nationID, 
    //     //   type: type,
    //     // });
        
    //     // redirects user back to their works page
    //     window.location.href="http://localhost:3000/startypes"
      }
    
    
    //   const parentRef = useRef()
    
    
      return (
        <div className='content centerDiv formContent'>
          <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
            <label className='subtopic text'>Add a Star Type</label>
            <div className='formContainer'>
              <div><input className='indivItem formItem' /* ref={parentRef} */ type="text" placeholder="Star type" name="Star type" value={type} onChange={(e) => setType(e.target.value)}/></div>
            </div>
            <div className='buttonsInline'>
              <button className='btns indivItem formItem' onClick={() => {window.location.href="http://localhost:3000/ships"}}>Back</button>
              <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add Type</button>
            </div>
          </form>
          
        </div>
      );
    }
    
    
    export default AddStarTypes;