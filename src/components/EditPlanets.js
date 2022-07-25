import React, {useState} from 'react';
// import axios from 'axios';

const EditPlanets = (props) => {
    //   const [parent, setParent] = useState("");
      const [name, setname] = useState("");
      const [colonized, setcolonized] = useState(null);
      const [ownerID, setownerID] = useState("");
      const [systemID, setsystemID] = useState("");

    
    //   // return page
      let link = "https://cs340-space-colonization.herokuapp.com/planets"
    
    //   const history_ = useHistory();
    
    //   // API call for creating a new tree
      const createEmpty = async(e) => {
    
    //     e.preventDefault();
    //     // await axios.post('http://localhost:5000/', {
    //     //   method:'POST',
    //     //   headers: { 'Content-Type': 'application/json'},
    //     //   nationID: nationID, 
    //     //   name: name,
    //          systemID: systemID,
    //          colonized: colonized
    //     // });
        
    //     // redirects user back to their works page
    //     window.location.href="https://cs340-space-colonization.herokuapp.com/planets"
      }
    
    
    //   const parentRef = useRef()
    
    
      return (
        <div className='content centerDiv formContent'>
          <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
            <label className='subtopic text'>Edit a Planet</label>
            <div className='formContainer'>
              <div><input className='indivItem formItem' /* ref={parentRef} */ type="text" placeholder="Planet Name" value={name} onChange={(e) => setname(e.target.value)}/></div>
            </div>
            <div className='dropdownList editAddbtn'>
                <select id = "ownerID" className='dropdown'>
                    <option className='indivItem formItem' value={"empty"} onChange={(e) => setownerID(e.target.value)}>Planet Owner</option>
                    <option className='indivItem formItem' value={ownerID} onChange={(e) => setownerID(e.target.value)}>Canada</option>
                    <option className='indivItem formItem' value={ownerID} onChange={(e) => setownerID(e.target.value)}>MX</option>
                </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    <select id = "colonizedStat" className='dropdown'>
                        <option className='indivItem formItem' value={"empty"} onChange={(e) => setcolonized(e.target.value)}>Colonized Status</option>
                        <option className='indivItem formItem' value={1} onChange={(e) => setcolonized(e.target.value)}>Yes</option>
                        <option className='indivItem formItem' value={0} onChange={(e) => setcolonized(e.target.value)}>No</option>
                    </select>
            </div>
            <div className='dropdownList editAddbtn'>
                    <select id = "ownerID" className='dropdown'>
                        <option className='indivItem formItem' value={"empty"} onChange={(e) => setsystemID(e.target.value)}>Star System</option>
                        <option className='indivItem formItem' value={systemID} onChange={(e) => setsystemID(e.target.value)}>1</option>
                        <option className='indivItem formItem' value={systemID} onChange={(e) => setsystemID(e.target.value)}>2</option>
                    </select>
            </div>
            <div className='buttonsInline'>
              <button className='btns indivItem formItem' onClick={() => {window.location.href="https://cs340-space-colonization.herokuapp.com/planets"}}>Back</button>
              <button className="btns indivItem formItem" type="submit"  /* onClick={/* handleAddPerson } */>Edit Planet</button>
            </div>
          </form>
          
        </div>
      );
    }
    
    
    export default EditPlanets;