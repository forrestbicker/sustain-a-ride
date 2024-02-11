import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutingForm from "./RoutingForm";
import SplashScreen from "./SplashScreen";

function App() {
  // useEffect(() => {
  //   const callAPI = async () => {
  //     const response = await fetch("/api/index.py", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ sampleInfo: "sample" }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   callAPI();
  // });
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SplashScreen />} />
        <Route path="/ride" element={<RoutingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
