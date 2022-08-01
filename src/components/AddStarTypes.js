import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const AddStarTypes = () => {
    //   const [parent, setParent] = useState("");
    //   const [nationID, setNationID] = useState(null);
      const [type, setType] = useState("");
    
    //   // return page
      let link = "/startypes"
    
      const history = useHistory();
    
    //   // API call for creating a new tree
      const createEmpty = async(e) => {
    
        e.preventDefault();
        await axios.post('https://cs340-spacecol-api.herokuapp.com/', {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},
          type: type,
        });
        
    //     // redirects user back to their works page
        history.push(link);
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
              <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
              <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Add Type</button>
            </div>
          </form>
          
        </div>
      );
    }
    
    
    export default AddStarTypes;