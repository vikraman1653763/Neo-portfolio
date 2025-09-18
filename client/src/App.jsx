import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import TailedCursor from "./components/TailedCursor.jsx";

const About = () => <div className="p-4">About Page</div>;
const NotFound = () => <div className="p-4">404 – Not Found</div>;

const App = () => {
  return (
    <div>
      <Navbar />
      <TailedCursor
  colors = {["#2d545e"]}    
        baseThickness={30}
        speedMultiplier={0.4}
        maxAge={600}
        enableFade={true}
        enableShaderEffect={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
