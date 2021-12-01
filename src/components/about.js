import React from "react";
// import { withRouter } from "react-router";
import { Link, useLocation, useNavigate } from "react-router-dom";

import temperature from "../assets/img/temperature.png";
import humidity from "../assets/img/humidity.png";
import sun from "../assets/img/sun.png";
import visible from "../assets/img/visible.png";
import dewPoint from "../assets/img/dew-point.png";
import pressure from "../assets/img/pressure.png";

function withRouter(Child) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />;
  };
}

const api = {
  key: "c53d07090596c4b22fd92015cd6a8ced",
  // key: "c9d105c23150b7acf6911cd65e59b171",
  base: "https://api.openweathermap.org/data/2.5/onecall?",
  icon: "http://openweathermap.org/img/wn/",
};

function getTime(data) {
  let timestamp = data * 1000;
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();

  console.log(new Date(timestamp));

  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

class About extends React.Component {
  state = {
    currentInfo: {},
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const city = params.get("city");
    const lat = params.get("lat");
    const lon = params.get("lon");

    fetch(
      `${api.base}lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${api.key}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        const time = getTime(res.current.dt);

        const data = {
          time: time,
          city: city,
          lat: lat,
          lon: lon,
          timezone: res.current.timezone_offset,
          temp: Math.round(res.current.temp),
          dewPoint: Math.round(res.current.dew_point),
          humidity: Math.round(res.current.humidity),
          icon: `${api.icon}${res.current.weather[0].icon}@2x.png`,
          alt: `${res.current.weather[0].description} image`,
          visibility: res.current.visibility / 1000,
          pressure: res.current.pressure,
          uvi: res.current.uvi,
        };

        this.setState({
          currentInfo: data,
        });
      });
  }

  render() {
    const currentInfo = this.state.currentInfo;

    const urlSearch = new URLSearchParams();
    urlSearch.set("city", currentInfo.city);
    urlSearch.set("lat", currentInfo.lat);
    urlSearch.set("lon", currentInfo.lon);
    console.log(urlSearch.toString());

    return (
      <div className="box">
        <div>{currentInfo.time}</div>
        <div>
          <img src={currentInfo.icon} alt={currentInfo.alt} />
        </div>
        <div className="footer">
          <div>
            <div className="footer-item">
              <img src={temperature} alt="" />
              <h4 className="footer-desc">Feels Like</h4>
              <div className="footer-value">{currentInfo.temp}&#176;C</div>
            </div>
          </div>
          <div>
            <div className="footer-item">
              <img src={humidity} alt="" />
              <h4 className="footer-desc">Humidity</h4>
              <div className="footer-value">{currentInfo.humidity}%</div>
            </div>
          </div>
          <div>
            <div className="footer-item">
              <img src={sun} alt="" />
              <h4 className="footer-desc">UV index</h4>
              <div className="footer-value">{currentInfo.uvi}</div>
            </div>
          </div>
          <div>
            <div className="footer-item">
              <img src={visible} alt="" />
              <h4 className="footer-desc">Visibility</h4>
              <div className="footer-value">{currentInfo.visibility} km</div>
            </div>
          </div>
          <div>
            <div className="footer-item">
              <img src={dewPoint} alt="" />
              <h4 className="footer-desc">Dew Point</h4>
              <div className="footer-value">{currentInfo.dewPoint}&#176;C</div>
            </div>
          </div>
          <div>
            <div className="footer-item">
              <img src={pressure} alt="" />
              <h4 className="footer-desc">Pressure</h4>
              <div className="footer-value">{currentInfo.pressure} mb</div>
            </div>
          </div>
        </div>
        <Link to="/search" className="button">
          Prev
        </Link>
        <Link to={`/${urlSearch}/details?`} className="button">
          More
        </Link>
      </div>
    );
  }
}

export default withRouter(About);
