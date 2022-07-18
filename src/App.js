import logo from './logo.svg';
import './style/App.css';
/* import pages */
import Homepage from './pages/Homepage.js';
import Nations from './pages/Nations';
import Ships from './pages/Ships.js';
import StarTypes from './pages/StarTypes.js';
import StarSystems from './pages/StarSystems.js';
import Materials from './pages/Materials.js';
import Planets from './pages/Planets.js';
import NatlResources from './pages/NatlResources.js';
import ProducedMaterials from './pages/ProducedMaterials.js';
import Adding from './pages/AddData';
import Navbar from './components/NavBar.js';
import AddForm from './components/AddingForm.js';
import EditNations from './components/EditNations.js';
import EditShips from './components/EditShips.js';
import EditStarTypes from './components/EditStarTypes.js';
import EditSystems from './components/EditSystem.js';
import EditMaterials from './components/EditMaterials.js';
import React, { useState } from 'react';


/* special library and its components to perform redirection easily */
import {
  BrowserRouter as Router, // store the components and its routes as an object
  Route, // a statement that holds the specific path of the app and the component's name, renders it once it matches the URL
  Switch, // renders the default components once the app rendered, switches between routes as needed
  Link, // like HREF in HTML but also allows you to redirect to the specific component based on its path
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom"; // more about that here: https://www.pluralsight.com/guides/how-to-set-react-router-default-route-redirect-to-home

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/nations" component={Nations} />
          <Route exact path="/ships" component={Ships} />
          <Route exact path="/startypes" component={StarTypes} />
          <Route exact path="/starsystems" component={StarSystems} />
          <Route exact path="/materials" component={Materials} />
          <Route exact path="/planets" component={Planets} />
          <Route exact path="/natl" component={NatlResources} />
          <Route exact path="/produced" component={ProducedMaterials} />
          <Route exact path="/addform" component={AddForm} />
          <Route exact path="/adddb" component={Adding} />
          <Route exact path="/nationsedit" component={EditNations} />
          <Route exact path="/shipsedit" component={EditShips} />
          <Route exact path="/startypesedit" component={EditStarTypes} />
          <Route exact path="/starsystemsedit" component={EditSystems} />
          <Route exact path="/materialsedit" component={EditMaterials} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
