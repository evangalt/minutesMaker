import logo from './logo.svg';
import './App.css';

function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the MinutesMaker!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>
          &copy; 2023 Galt Enterprises
        </p>
      </header>
    </div>
  );
}

export default App;
