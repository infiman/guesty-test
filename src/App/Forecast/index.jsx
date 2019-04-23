import React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { getForecastDataByCity } from '../../store/forecast'

import './styles.css'

const Forecast = ({ forecast }) => (
  <div className="forecast">
    {forecast.map(({ date, minTemp, maxTemp, icon, conditions }) => (
      <div key={format(date, 'ddd M/D')} className="container">
        <div className="header">{format(date, 'ddd M/D')}</div>
        <div className="content">
          <div className="temp">
            <span className="red">{maxTemp}</span>
            {` `}/{` `}
            <span className="blue">{minTemp}</span>
          </div>
          <img
            alt="conditions"
            src={`http://openweathermap.org/img/w/${icon}.png`}
          />
          <span>{conditions}</span>
        </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = (state, { city, sort }) => ({
  forecast: getForecastDataByCity(state, city, sort)
})

export default connect(mapStateToProps)(Forecast)
