import React from 'react'
import { connect } from 'react-redux'

import Forecast from './Forecast'

import { fetchForecast, getForecastMetadata } from '../store/forecast'

import './styles.css'

function App({ fetchForecast, metadata: { fetching, error } }) {
  const [city, setCityState] = React.useState('jerusalem,il')
  const [sort, setSort] = React.useState('date')

  React.useEffect(() => {
    fetchForecast({ city })
  }, [city, fetchForecast])

  return (
    <div className="main">
      <div>
        <button
          disabled={fetching}
          onClick={() => setCityState('jerusalem,il')}
        >
          Jerusalem
        </button>
        <button disabled={fetching} onClick={() => setCityState('london,uk')}>
          London
        </button>
        <button disabled={fetching} onClick={() => setCityState('paris,fr')}>
          Paris
        </button>
        <button disabled={fetching} onClick={() => setCityState('prague,cz')}>
          Prague
        </button>
        <button
          disabled={fetching}
          onClick={() => setCityState('new york,ny,us')}
        >
          New York
        </button>
      </div>
      {error && <span>{error.message}</span>}
      <Forecast city={city} sort={sort} />
      {fetching && <span>{`Fetching data for ${city}...`}</span>}
      <div>
        Sort by:
        <button onClick={() => setSort('date')}>Date</button>
        <button onClick={() => setSort('minTemp')}>Low temperature</button>
        <button onClick={() => setSort('maxTemp')}>High temperature</button>
        <button onClick={() => setSort('humidity')}>Humidity</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  metadata: getForecastMetadata(state)
})

const mapDispatchToProps = {
  fetchForecast
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
