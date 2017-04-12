import React, {PropTypes} from 'react';
import {List} from 'immutable';
import TrendingItem from '../trending-item';


function TrendingList({deleteTrending, trendings, updateTrending}) {
  let trendingItems = trendings.map((trending, index) => {
    return (
        <TrendingItem
          deleteTrending={deleteTrending}
          key={index}
          trending={trending}
          updateTrending={updateTrending}
        />
    );
  });

  return (
    <div className="trending-list">
      <h3>Trending wishes</h3>
      {trendingItems}
    </div>
  );
}

TrendingList.propTypes = {
  deleteTrending: PropTypes.func.isRequired,
  trendings: PropTypes.instanceOf(List).isRequired,
  updateTrending: PropTypes.func.isRequired
};

export default TrendingList;
