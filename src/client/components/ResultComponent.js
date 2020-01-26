import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ResultComponent = ({ Result }) => (
  <div className="result-component">
    {Result.map(item => (
      <ul key={item.id}>
        <li>{item.name}</li>
        <li>{item.country}</li>
        <Link to={`/details/${item.id}`}>
          <button type="button">Get info</button>
        </Link>
      </ul>
    ))}
  </div>
);

ResultComponent.propTypes = {
  Result: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default ResultComponent;
