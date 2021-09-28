/* Mohammad Mahmud CTP Zip Search Lab */ 

import React, { Component } from 'react';
import './App.css';

function City(props) {
  return  (
    <div className="city-box">
      <h2 id="title">{props.data.City}, {props.data.State}</h2>
      <ul className="cities-list">
        <li>State: {props.data.State}</li>
        <li>Location: ({props.data.Lat}, {props.data.Long})</li>
        <li>Population (estimated): {props.data.EstimatedPopulation}</li>
        <li>Total Wages: {props.data.TotalWages}</li>
      </ul>
    </div>
  )
}

function ZipSearchField(props) {
  return (
    <div className="zip-search">
        Zip Code: &nbsp;
        <input className="search-box" type="text" placeholder="Try 10016" onChange={props.changeHandler}>
        </input>

    </div>
  )
}

class App extends Component {
  // leave default constructor

  state = {
    zipCode: "",
    cities: []
  }

  /* Returns true if a zip code is valid
    A zip code is valid if it has exactly 5 characters and is all */
  isValidZipCode = (zipCode) => {
    if (zipCode.length !== 5) return false;
    for(let c of zipCode) {
      let x = parseInt(c);
      if (x !== 0 && !x) return false;
    }
    return true;
  }

  zipChanged = (event) => {
    this.setState({zipCode: event.target.value})

    /* If the given text is a valid zip code, retrieve and display zip code info. */
    if (this.isValidZipCode(event.target.value)) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then(response => response.json())
      .then(data => {
        // put each Record into cities array in state
        let citiesData = []
        for (let d of data) {
          citiesData.push(d);
        }
        this.setState({ cities: citiesData });
      })
      .catch(error => console.log("Invalid Zip Code!"))
    } 
    /* If the zip code is not valid, clear the cities array, don't display anything. */
    else {
      this.setState( {cities: []})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          {this.state.cities.map((city) => <City data={city}/>)}
        </div>
      </div>
    );
  }
}

export default App;
