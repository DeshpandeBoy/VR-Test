import React, { Component } from "react";
import "aframe";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      gallery: true,
      currentImage: null
    };
  }

  componentDidMount() {
    fetch("https://demo0813639.mockable.io/getPanos")
      .then(result => result.json())
      .then(data => this.setState({ data }));
  }

  handleClick(pano) {
    this.setState({
      gallery: false,
      currentImage: pano
    });
    console.log(this.state.currentImage);
  }

  render() {
    const vr = this.state.gallery;

    return (
      <div>
        {vr ? (
          <div className="container">
            <h1>Click any of the pic to experience vr</h1>
            <div className="images">
              <ul id="images">
                {this.state.data.map((image, i) => (
                  <img
                    key={i}
                    className="col-3"
                    src={image.pano}
                    onClick={() => this.handleClick(image.pano)}
                  />
                ))}
              </ul>
              <ul id="text">
                {this.state.data.map((name, i) => (
                  <h1 key={i} className="col-3">
                    {" "}
                    {name.name}{" "}
                  </h1>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => this.setState({ gallery: true })}>
              Go back
            </button>
            <a-scene>
              <a-sky src={this.state.currentImage}> </a-sky>)
            </a-scene>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
