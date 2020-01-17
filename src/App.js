import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MainRoute from "./routes/MainRoute"
import axios from "axios"
// var cors = require('cors')

// app.use(cors())

class App extends React.Component{

  
  render(){
    return <MainRoute />
  }
}

export default App
