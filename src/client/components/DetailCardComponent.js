import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { toCelsius, toFahrenheit } from '../helpers/TempConverter';

const DetailCardComponent = ({ data }) => {
  const [metric, setMetric] = useState('F');
  const [metricFunction, setMetricFunction] = useState({ call: toFahrenheit });

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

  return (
    <div className="detail-card-component">
      <ul>
        <button type="button" className="metric-btn" onClick={toggleMetrics}>
          C°/ F°
        </button>
        <li>{data.name}</li>
        <li>{data.weatherMain}</li>
        <li>{`Temperature: ${metricFunction.call(data.mainTemp)} °${metric} `}</li>
        <li>{`Feels Like: ${metricFunction.call(data.mainFeelsLike)} °${metric} `}</li>
        <li>{`Max: ${metricFunction.call(data.mainTempMax)} °${metric} `}</li>
        <li>{`Min: ${metricFunction.call(data.mainTempMin)} °${metric}`}</li>
      </ul>
    </div>
  );
};

DetailCardComponent.propTypes = {
  data: Proptypes.objectOf(Proptypes.oneOfType([Proptypes.string, Proptypes.number])).isRequired
};

export default DetailCardComponent;
