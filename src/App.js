import React, { Component } from 'react';
// import './App.css';
import Footer from "./components/footer";
import Header from "./components/header";
import EntriesView from "./components/allEntries";
import "./style/global.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <EntriesView/>
        <Footer/>
      </div>
    );
  }
}

export default App;
