import axios from 'axios'

export class ApiClient {

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  getWeather() {
    return this.getRequest("http://api.openweathermap.org/data/2.5/forecast?id=291f792c010e95faff4311004f7b7301")
  }



  getRequest(url) {
    return axios
      .get(url)
      .then(this.status)
      .catch((error) => {
        console.error(error);
        alert(error)
      });
  }
}