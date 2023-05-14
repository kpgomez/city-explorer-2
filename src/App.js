import React from 'react';
import './App.css';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      searchQuery: '',
      city: {},
      mapImg: '', 
    }
  }
  updateInput = (e) => this.setState({ searchQuery: e.target.value }
    , () => console.log(this.state.searchQuery));

  getLocation = async (e) => {
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${e.target.value}&format=json`;
      // console.log(url);
      const response = await axios.get(url);
      console.log(response.data[0]);
      this.setState({
        displayInfo: true,
        city: response.data[0], 
      }, () => console.log(this.state.city));
    }
    catch (error) {
      document.write(error);
      document.write(': Unable to geocode')
    }
  }
  
  getMap = async () => {
    const url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${47.6038321},${-122.330062}&zoom=5`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response);
    this.setState({
      mapImg: response.data
    })
  }
  
  submitHandler(e) {
    this.getLocation(e);
    this.getMap();
  }
  
  render() {
    console.log(this.state.city);
    console.log(this.state.displayInfo);
    return (
      <>
        <Container>
          <Form onSubmit={this.submitHandler.bind(this)}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" onChange={this.updateInput} placeholder="Enter city name" />
              <Button type="submit">Explore!</Button>
            </Form.Group>
          </Form>
        </Container>

      </>
    )
  }

}

export default App;

// Given that a user enters a valid location in the input

// When the user clicks the "Explore!" button

// Then the latitude and longitude will be displayed on the page

// Endpoint:

// Region 1: US
// GET: https://us1.locationiq.com/v1/search.php

// Region 2: Europe
// GET: https://eu1.locationiq.com/v1/search.php

// Query parameters:

// key: YOUR_ACCESS_TOKEN
// q: SEARCH_STRING
// format: 'json'

// Given that a user enters a valid location in the input

// When the user clicks the "Explore!" button

// Then the map of the city is displayed on the page.

// Endpoint:

// GET: https://maps.locationiq.com/v3/staticmap

// Query parameters:

// key: Authentication key
// center: Defines the center of the map. It takes a comma separated value of a latitude, longitude pair.
// zoom: 1-18

// Example Response: PNG image

// Features
