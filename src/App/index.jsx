import React from 'react'
import { connect } from 'react-redux'

import Forecast from './Forecast'

import { fetchForecast, getForecastMetadata } from '../store/forecast'

import './styles.css'

function App({ fetchForecast, metadata: { fetching, error } }) {
  const [city, setCityState] = React.useState('jerusalem,il')

  React.useEffect(() => {
    fetchForecast({ city })
  }, [city, fetchForecast])

  return (
    <div>
      <button disabled={fetching} onClick={() => setCityState('jerusalem,il')}>
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
      {error && <span>{error.message}</span>}
      <Forecast city={city} />
      {fetching && <span>{`Fetching data for ${city}...`}</span>}
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
