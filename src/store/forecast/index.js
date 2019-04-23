import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

export const getForecastMetadata = createSelector(
  state => state.forecast,
  ({ fetching, error }) => ({ fetching, error })
)

export const getForecastDataByCity = createCachedSelector(
  state => state.forecast.cities,
  (_, city) => city,
  (_, __, sort) => sort,
  (cities, city, sort) =>
    cities[city] ? cities[city].sort((a, b) => a[sort] - b[sort]) : []
)((_, city, sort) => `${city}${sort}`)

const FETCH_FORECAST = 'guesty-test/forecast/FETCH_FORECAST'
export const fetchForecast = ({ city }) => dispatch => {
  dispatch({ type: FETCH_FORECAST })

  return fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}`,
    {
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '9qrG3B1QAWmshwyFjIWlqdBhZ0gAp1G13r8jsn5Dt4Ew6VWbFL'
      }
    }
  )
    .then(data => data.json())
    .then(response => {
      const cToKZero = 273.15
      const firstHour = new Date(response.list[0].dt_txt).getHours()
      const forecast = response.list
        .filter(({ dt_txt }) => firstHour === new Date(dt_txt).getHours())
        .map(
          ({
            dt_txt,
            main: { temp_min, temp_max, humidity },
            weather: [{ main, icon }]
          }) => ({
            icon,
            humidity,
            date: new Date(dt_txt),
            minTemp: Math.round(temp_min - cToKZero),
            maxTemp: Math.round(temp_max - cToKZero),
            conditions: main
          })
        )

      dispatch(fetchForecastSucceed({ city, forecast }))
    })
    .catch(error => dispatch(fetchForecastFailed({ city, error })))
}

const FETCH_FORECAST_SUCCEED = 'guesty-test/forecast/FETCH_FORECAST_SUCCEED'
const fetchForecastSucceed = payload => ({
  payload,
  type: FETCH_FORECAST_SUCCEED
})

const FETCH_FORECAST_FAILED = 'guesty-test/forecast/FETCH_FORECAST_FAILED'
const fetchForecastFailed = payload => ({
  payload,
  type: FETCH_FORECAST_FAILED
})

const SET_SORT_KEY = 'guesty-test/forecast/SET_SORT_KEY'
export const setSortKey = payload => ({
  payload,
  type: SET_SORT_KEY
})

const initialState = {
  sort: 'date',
  error: null,
  cities: {},
  fetching: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SORT_KEY:
      return { ...state, sort: payload.sort }
    case FETCH_FORECAST:
      return { ...state, fetching: true }
    case FETCH_FORECAST_SUCCEED:
      return {
        ...state,
        fetching: false,
        cities: {
          ...state.cities,
          [payload.city]: payload.forecast
        }
      }
    case FETCH_FORECAST_FAILED:
      return { ...state, fetching: false, error: payload.error }
    default:
      return state
  }
}
