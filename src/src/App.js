import logo from './logo.svg';
import './App.css';
import ColorPalette from './color-palette';
import Header from './header';
import Home from './home';


function App() {
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <Home />
      </div>
    </div>
  );
}

export default App;
