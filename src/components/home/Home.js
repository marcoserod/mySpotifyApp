import React, { useState } from 'react';
import Search from '../search/Search';
import ItemsCarousel from 'react-items-carousel';

const Home = (props) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
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
        <div className="favorites">
          <h2>Favorites</h2>
          <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={2}
              gutter={20}
              leftChevron={<button>{'<'}</button>}
              rightChevron={<button>{'>'}</button>}
              outsideChevron
              chevronWidth={chevronWidth}
            >
              <div style={{ height: 200, background: '#EEE' }}>First card</div>
              <div style={{ height: 200, background: '#EEE' }}>Second card</div>
              <div style={{ height: 200, background: '#EEE' }}>Third card</div>
              <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
            </ItemsCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
