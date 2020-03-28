import React from 'react';
//import ReactDOM from 'react-dom';

import Header from "./components/Header"
import MainContent from "./components/MainContent"
//import Footer from "./components/Footer"



class App extends React.Component  {

    constructor(){
        super()
        
    }

   

    render(){
        return (
            <div>
                <Header/>
                <MainContent/>        
            </div>
        )
    }
    
}

  export default App;