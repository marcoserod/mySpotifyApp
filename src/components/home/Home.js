import React, { useState, useEffect, useContext } from 'react';
import { fetchUserData } from '../../services/data';
import { AuthContext } from '../../contexts/Auth.context';

const Home = (props) => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => fetchUserData(token, setUserData), [fetchUserData]);

  return userData ? (
    <section>
      <div> logged as {userData.display_name}</div>
    </section>
  ) : (
    <div>loading</div>
  );
};

export default Home;
