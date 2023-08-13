import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import NavBar from './compenents/NavBar';
import Home from './compenents/Home';
import Register from './compenents/Register';
import Edit from './compenents/Edit';
import Details from './compenents/Details';
import { Routes, Route } from "react-router-dom"

function App() {
  return (

    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
      </Routes>

    </>



  );
}

export default App;
