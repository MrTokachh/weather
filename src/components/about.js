import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const api = {
  key: "c53d07090596c4b22fd92015cd6a8ced",
  // key: "c9d105c23150b7acf6911cd65e59b171",
  base: "https://api.openweathermap.org/data/2.5/onecall?",
  icon: "http://openweathermap.org/img/wn/",
};

class About extends React.Component {
  state = {
    temp: "",
    humidity: "",
    dewPoint: "",
    icon: "",
    alt: "",
  };

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    // const city = params.get("city");
    const lat = params.get("lat");
    const lon = params.get("lon");

    fetch(
      `${api.base}lat=${lat}&lon=${lon}&exclude=hourly,daily,minutely&appid=${api.key}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          temp: Math.round(res.current.temp),
          dewPoint: Math.round(res.current.dew_point),
          humidity: Math.round(res.current.humidity),
          icon: `${api.icon}${res.current.weather[0].icon}@2x.png`,
          alt: `${res.current.weather[0].description} image`,
        });
      });
  }

  render() {
    return (
      <div className="box">
        <div>{this.state.temp}</div>
        <div>{this.state.humidity}</div>
        <div>{this.state.dewPoint}</div>
        <div>
          <img src={this.state.icon} alt={this.state.alt} />
        </div>
        <Link to="/search" className="button">
          Prev
        </Link>
      </div>
    );
  }
}

export default withRouter(About);
