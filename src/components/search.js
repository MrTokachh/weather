import React from "react";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";

class Search extends React.Component {
  state = {
    list: [],
    value: "",
    isError: false,
  };

  handleChange = (e) => {
    let regexp = /[а-яё]/i;
    let val = e.target.value;

    this.setState({ value: val });

    if (val.trim().length === 0) {
      this.setState({ list: [], isError: false });
    } else {
      if (regexp.test(val)) {
        this.setState({ list: [], isError: true });
      } else {
        fetch(
          `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${val}`
        )
          .then((res) => res.json())
          .then(({ data }) => {
            console.log(data.length);

            if (data.length === 0) {
              this.setState({ isError: true });
            } else {
              const cities = data.map((item) => ({
                city: item.city,
                lat: item.latitude,
                lon: item.longitude,
              }));

              this.setState({ list: cities, isError: false });
            }
          });
      }
    }
  };

  render() {
    const isError = this.state.isError;

    return (
      <div className="box">
        <DebounceInput
          minLength={1}
          debounceTimeout={500}
          onChange={this.handleChange}
          autoFocus
          value={this.state.value}
        />
        <ul>
          {!isError && (
            <>
              {this.state.list.map((cityItem, i) => {
                const urlSearch = new URLSearchParams();
                urlSearch.set("city", cityItem.city);
                urlSearch.set("lat", cityItem.lat);
                urlSearch.set("lon", cityItem.lon);

                return (
                  <li key={cityItem.city.toString()}>
                    <Link to={`/about?${urlSearch}`}>{cityItem.city}</Link>
                  </li>
                );
              })}
            </>
          )}

          {isError && <li>error</li>}
        </ul>
      </div>
    );
  }
}

export default Search;
