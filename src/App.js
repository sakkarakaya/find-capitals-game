import './App.css';
import MyMapComponent from "./pages/Mapchart";
import ContainedButtons from "./components/Buttons"
import { useState } from 'react';

function App() {
  const [distance, setDistance] = useState()
  const [index, setIndex] = useState(0)
  return (
    <div className="App">
      <ContainedButtons distance={distance} index={setIndex}/>
      <MyMapComponent distance={setDistance} index={index}/>
      
    </div>
  );
}

export default App;
