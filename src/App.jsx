import React, { Component } from "react";
import "./App.css";
import Button from "./Button.jsx";

class App extends Component {
  controller = new AbortController();

  constructor(props) {
    super(props);

    this.state = {
      //hasLoaded: true,
      title: "",
      //films: [],
    };
  }

  handleInput = (e) => {
    this.setState({ title: e.target.value});
  };

  filterResults() {
    return this.state.films.filter((film) => film.title.toLowerCase().includes(this.state.title.toLowerCase()))
    .map((film) => <li key={film.id}>{film.title}</li>);
  }

  componentDidMount() {
    console.log("App - Mount");
    fetch("https://ghibliapi.herokuapp.com/films", { signal: this.controller.signal,})
      .then((res) => res.json())
      .then((films) => {
        console.log(films);
        this.setState({ hasLoaded: true, films });
      })
    .catch((err) => console.error(err))
  }

  /*componentWillUnmount() {
    this.controller.abort();
  }*/

  render() {
    if (this.state.hasLoaded) {
    return (
      <main>
        <h1>Studio Ghibli Films</h1>
        <input 
          //type="search"
          placeholder="Search Title"
          //id="title" 
          //name="title" 
          //aria-label="Search Title" 
          value={this.state.title} 
          onChange={this.handleInput}/>
        <ul>
          {this.filterResults()}
        </ul>
      </main>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

function () {
  return Button;
}

}



export default App;
