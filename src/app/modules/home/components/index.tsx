import React from "react";
import Banner from "./Banner";
import MainView from "./MainView";
import Tags from "./Tags";

const Home = () => (
  <>
    <div className="home-page">
      <Banner></Banner>
      <div className="container page">
        <div className="row">
          <MainView />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;
