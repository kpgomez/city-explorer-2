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
      mapImg: ''
    }
  }

  updateInput = (e) => this.setState({ searchQuery: e.target.value }
    , () => console.log(this.state.searchQuery));

  handleSearchQuery = async (e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data[0]);
    this.setState({
      displayInfo: true,
      city: response.data[0]
    });

    console.log(response.data[0].lat);
    console.log(response.data[0].lon);

  }

  render() {
    return (
      <>
        <Container>
          <Form onSubmit={this.handleSearchQuery}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" onChange={this.updateInput} placeholder="Enter city name" enabled />
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
