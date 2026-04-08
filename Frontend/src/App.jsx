import React, { useState } from "react";
import Wether from "./Components/Wether";

const App = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className="app">
      <Wether weather={weather} />
    </div>
  );
};

export default App;
