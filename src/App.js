import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ce094094e798439b9195fad8b007a24b'
});

const particleOptions = {
                particles: {
                  number: {
                    value: 35,
                    density: {
                      enable: true,
                      value_area: 600,
                    }
                  }
                }
              }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  //Load User After Register and Signin
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  
  onDetectButton = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=> {
      if(response) {
        fetch('https://enigmatic-hamlet-07374.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=> response.json())
        .then(count=> {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
    this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch (err=> console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles' params={particleOptions} />
          { this.state.route === 'home' 
          ? <div>
              <Navigation onRouteChange={this.onRouteChange}/>
              <Logo />
              <Rank name={ this.state.user.name } entries={ this.state.user.entries }/>
              <ImageLinkForm onInputChange={ this.onInputChange } onDetectButton={this.onDetectButton}/>
              <FaceRecognition box={this.state.box} imageUrl={ this.state.imageUrl }/>
          </div>
          : (
              this.state.route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )

        }
      </div>
   );
  }
}

export default App;
