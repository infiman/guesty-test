const FETCH_FORECAST = "guesty-test/forecast/FETCH_FORECAST";
export const fetchForecast = city => dispatch =>
  fetch(
    "https://community-open-weather-map.p.rapidapi.com/forecast?q=london%2Cuk",
    {
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": "9qrG3B1QAWmshwyFjIWlqdBhZ0gAp1G13r8jsn5Dt4Ew6VWbFL"
      }
    }
  )
    .then(data => data.json())
    .then(response =>
      dispatch(fetchForecastSucceed({ city, forecast: "blabla" }))
    )
    .catch(error => dispatch(fetchForecastFailed({ city, error })));

const FETCH_FORECAST_SUCCEED = "guesty-test/forecast/FETCH_FORECAST_SUCCEED";
const fetchForecastSucceed = payload => ({
  payload,
  type: FETCH_FORECAST_SUCCEED
});

const FETCH_FORECAST_FAILED = "guesty-test/forecast/FETCH_FORECAST_FAILED";
const fetchForecastFailed = payload => ({
  payload,
  type: FETCH_FORECAST_FAILED
});

const initialState = {
  error: null,
  cities: {},
  fetching: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FORECAST:
      return { ...state, fetching: true };
    case FETCH_FORECAST_SUCCEED:
      return {
        ...state,
        fetching: false,
        cities: {
          [payload.city]: payload.forecast
        }
      };
    case FETCH_FORECAST_FAILED:
      return { ...state, fetching: false, error: payload.error };
    default:
      return state;
  }
};
