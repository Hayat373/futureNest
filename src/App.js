import logo from './logo.svg';
import './App.css';

import Landingpage from './components/landingpage';

function App() {

  const handleMouseMove = () => {
    // You can add interactivity here
  };
  return (
    <div className="App" onMouseMove={handleMouseMove} >

      <Landingpage/>
    </div>
  );
}

export default App;
