import React from 'react';
import Scard from './scard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar'
import CardGroup from 'react-bootstrap/CardGroup';
import { ApiClient } from './ApiClient'




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: "",
      weather: []
    }
    this.apiClient = new ApiClient()
  }


  fetchWeatherData() {
    this.setState({
      loading: "....loading",
      fetching: true
    })

    this.apiClient.getWeather()
      .then((response) => { this.updateWeather(response.data.daily) })
      .finally(() => {
        this.setState({
          loading: ""
        }, console.log(this.state.weather))
      })
  }

  updateWeather(response) {
    this.setState({
      weather: response
    })
  }

  buildCards() {
    return this.state.weather.slice(1, 6).map((current, i) => (
      <Col key={i} lg>
        <CardGroup>
          <Scard dateString={current.dt} img={current.weather[0].icon} alt={current.weather[0].description} text={current.weather[0].description} max={current.temp.max} min={current.temp.min} wind={current.wind_speed} />
        </CardGroup>
      </Col>

    )
    )
  }

  componentDidMount() {
    this.fetchWeatherData()

  }

  render() {
    return (
      <>

        <Container>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Weather {this.state.loading}</Navbar.Brand>
          </Navbar>
          <Row>
            {this.buildCards()}
          </Row>
        </Container>
      </>
    );
  }


}

export default App;
