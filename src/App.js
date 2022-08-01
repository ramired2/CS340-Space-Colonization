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
import Navbar from './components/NavBar.js';

// adding pages
import AddNations from './components/AddNations.js';
import AddShips from './components/AddShips.js';
import AddStarTypes from './components/AddStarTypes.js';
import AddStarSystems from './components/AddStarSystems.js';
import AddMaterials from './components/AddMaterials.js';
import AddPlanets from './components/AddPlanets.js';
import AddNatlResources from './components/AddNatlResources.js';
import AddProduced from './components/AddProd.js';

// edit pages
import EditNations from './components/EditNations.js';
import EditShips from './components/EditShips.js';
import EditStarTypes from './components/EditStarTypes.js';
import EditSystems from './components/EditSystem.js';
import EditMaterials from './components/EditMaterials.js';
import EditPlanets from './components/EditPlanets.js';
import EditNatlResources from './components/EditNatlResources.js';
import EditProduced from './components/EditProduced.js';
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

          {/* adding pages */}
          <Route exact path="/nationsadd" component={AddNations} />
          <Route exact path="/shipsadd" component={AddShips} />
          <Route exact path="/startypesadd" component={AddStarTypes} />
          <Route exact path="/starsystemsadd" component={AddStarSystems} />
          <Route exact path="/materialsadd" component={AddMaterials} />
          <Route exact path="/planetsadd" component={AddPlanets} />
          <Route exact path="/natladd" component={AddNatlResources} />
          <Route exact path="/prodadd" component={AddProduced} />

          {/* edit pages */}
          <Route exact path="/nationsedit/:id" component={EditNations} render={(id) => <EditNations {...id}/>}/>
          <Route exact path="/shipsedit/:id" component={EditShips} render={(id) => <EditShips {...id}/>}/>
          <Route exact path="/startypesedit/:id" component={EditStarTypes} render={(id) => <EditStarTypes {...id}/>}/>
          <Route exact path="/starsystemsedit/:id" component={EditSystems} render={(id) => <EditSystems {...id}/>}/>
          <Route exact path="/materialsedit/:id" component={EditMaterials} render={(id) => <EditMaterials {...id}/>}/>
          <Route exact path="/planetsedit/:id" component={EditPlanets} render={(id) => <EditPlanets {...id}/>}/>
          <Route exact path="/natledit/:id" component={EditNatlResources} render={(id) => <EditNatlResources {...id}/>}/>
          <Route exact path="/prodedit/:id" component={EditProduced} render={(id) => <EditProduced {...id}/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
