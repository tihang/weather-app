import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Axios from 'axios';
import { toCelsius, toFahrenheit } from '../helpers/TempConverter';

const DetailCardComponent = ({ data, remove }) => {
  const [metric, setMetric] = useState('F');
  const [metricFunction, setMetricFunction] = useState({ call: toFahrenheit });
  const [message, setMessage] = useState('');

  const toggleMetrics = () => {
    if (metric === 'F') {
      setMetric('C');
      setMetricFunction({ call: toCelsius });
    }
    if (metric === 'C') {
      setMetric('F');
      setMetricFunction({ call: toFahrenheit });
    }
  };

  const handleRemoveWatch = () => {
    Axios.post(
      '/api/profile/favorite/delete',
      { savedCityId: data.id },
      { headers: { 'auth-token': localStorage.getItem('auth-token') } }
    )
      .then((result) => {
        if (result.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => setMessage(err));
  };

  return (
    <div className="detail-card-component">
      <ul>
        <button type="button" className="metric-btn" onClick={toggleMetrics}>
          C°/ F°
        </button>
        {remove ? (
          <button type="button" className="x-button" onClick={handleRemoveWatch}>
            x
          </button>
        ) : null}
        <li>{data.id}</li>
        <li>{data.name}</li>
        <li>{data.weatherMain}</li>
        <li>{`Temperature: ${metricFunction.call(data.mainTemp)} °${metric} `}</li>
        <li>{`Feels Like: ${metricFunction.call(data.mainFeelsLike)} °${metric} `}</li>
        <li>{`Max: ${metricFunction.call(data.mainTempMax)} °${metric} `}</li>
        <li>{`Min: ${metricFunction.call(data.mainTempMin)} °${metric}`}</li>
      </ul>
      <p>{message}</p>
    </div>
  );
};

DetailCardComponent.propTypes = {
  data: Proptypes.objectOf(Proptypes.oneOfType([Proptypes.string, Proptypes.number])).isRequired,
  remove: Proptypes.bool.isRequired
};

export default DetailCardComponent;
