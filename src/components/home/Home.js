import React, { useState, useEffect, useContext } from 'react';
import { fetchUserData } from '../../services/data';
import { AuthContext } from '../../contexts/Auth.context';

const Home = (props) => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData(token, setUserData);
  }, [fetchUserData]);

  return userData ? (
    <section className="home-page container-fluid">
      <div className="container">
        <h1>
          Welcome to <div id="app-name">Spotisearch-ish</div>
        </h1>
        <h4>
          Search your favorite songs over spotify, just enter an artist's name
          in the following search box and enjoy!
        </h4>
      </div>
    </section>
  ) : (
    <div>loading</div>
  );
};

export default Home;
