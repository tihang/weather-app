import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ResultComponent = ({ Result }) => (
  <div className="result-component">
    {Result.map(item => (
      <ul key={item.id}>
        <li>{item.id}</li>
        <li>{item.name}</li>
        <li>{item.country}</li>
        <Link to={`/search/${item.id}`}>Get Weather info</Link>
      </ul>
    ))}
  </div>
);

ResultComponent.propTypes = {
  Result: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default ResultComponent;
