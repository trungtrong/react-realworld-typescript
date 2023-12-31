import React from "react";
import { APP_NAME } from "../../utils/constant";


const Banner = () => (
  <div className="banner navbar-blue">
    <div className="container">
      <h1 className="logo-font">{APP_NAME.toLowerCase()}</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
);

export default Banner;
