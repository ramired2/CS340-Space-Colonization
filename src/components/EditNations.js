import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditNations = (props) => {
//   const [parent, setParent] = useState("");
//   const [nationID, setNationID] = useState(null);
  const [name, setName] = useState("");
  const [numCol, setNumCol] = useState("");
  const [numShip, setNumShip] = useState("");

  const [retreived, setretreived] = useState(false);

//   // return page
  let link = "/nations"

  const id = props.match.params.id;

  useEffect(() => {
    preload();
  }, []);

  const history = useHistory();

//   // API call for creating a new tree
  const createEmpty = async(e) => {

    e.preventDefault();
    await axios.post('https://cs340-spacecol-api.herokuapp.com/editnation', {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      nationID: id, 
      name: name,   
      numColonized: numCol,
      numShips: numShip,
    });
    
//     // redirects user back to their works page
    history.push(link);
  }

  const preload = async() => {
    await axios ('https://cs340-spacecol-api.herokuapp.com/getnationsbyID/'+ id, {
      method:'GET',
      headers: { 'Content-Type': 'application/json'},
    }).then(result => {

      setName(result.data[0]['nationName'])
      setNumShip(result.data[0]['shipQuantity'])
      setNumCol(result.data[0]['conquestsQuantity'])

    })
    .catch(err => console.log(err));
  };


  return (
    <div className='content centerDiv formContent'>
      <form id="target" action={link} encType="multipart/form-data" onSubmit={createEmpty}>
        <label className='subtopic text'>Edit a Nation</label>
        <div className='formContainer'>
          <div><input className='indivItem formItem' type="text" placeholder="Nation name" name="Nation Name" value={name} onChange={(e) => setName(e.target.value)}/></div>
          <div><input className='indivItem formItem' type="text" placeholder="Ship quantity" name="0" value={numShip} onChange={(e) => setNumShip(e.target.value)}/></div>
          <div><input className='indivItem formItem' type="text" placeholder="Colonized planets quantity" name="0" value={numCol} onChange={(e) => setNumCol(e.target.value)}/></div>
        </div>
          <button className='btns indivItem formItem' onClick={() => {history.push(link);}}>Back</button>
          <button className="btns indivItem formItem" type="submit">Edit Nation</button>
      </form>
      
    </div>
  );
}


export default EditNations;