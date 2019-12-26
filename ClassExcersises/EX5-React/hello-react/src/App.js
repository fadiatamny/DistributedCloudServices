import React from 'react';
import logo from './logo.svg';
import './App.css';

class m extends React.Component{

  constructor(props)
  {
    super(props);
    this.blue = this.blue.bind(this);
  }

  blue()
  {
    this.refs.divblue.style.backgroundColor = this.props.color;
    alert(`color me blue for ${this.dur}`);
  }

  render(){
    return ( <div onClick={this.blue} ref="divblue">cluckme</div>)
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default m;
