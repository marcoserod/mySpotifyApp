import React from 'react';
import Search from '../search/Search';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  document.title = 'Spotisearch-ish';
  return (
    <section className="home-page container-fluid">
      <div className="container">
        <h1>
          Welcome to <div id="app-name">Spotisearch-ish</div>
        </h1>
        <h4>
          Search your favorite songs over spotify, just enter an artist's name
          in the following search box and enjoy!
        </h4>
        <Search />
      </div>
    </section>
  );
};

export default Home;
