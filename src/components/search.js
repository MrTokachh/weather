import React from "react";
import {DebounceInput} from 'react-debounce-input';

const getCityList = () => {
  fetch (`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=khark`)
    .then(res => res.json())
    .then(res => console.log(res.data.map(ci => {
      return {
        city: ci.city,
        country: ci.country,
        region: ci.region
      }
    })))
    
}

  

class Search extends React.Component {
  render() {
    return (
      <div>
        <DebounceInput
            minLength={1}
            debounceTimeout={300}
            // onChange={this.props.weatherMethod}
            onChange={getCityList}
            />
            
      </div>
    );
  }
}

export default Search;
