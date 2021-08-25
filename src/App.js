import logo from './logo.svg';
import './App.css';
// import ES from './echart/_index';
import ECHART from './echart/index';
function App() {
  return (
    <div className="App">
      {/* <ES/> */}
      <ECHART/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reloadssss .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
