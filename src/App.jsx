import React, { Component } from "react";
import "./App.css";
import Button from "./Button.jsx";

class App extends Component {
  controller = new AbortController();

  constructor(props) {
    super(props);

    this.state = {
      title: "",
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

  render() {
    if (this.state.hasLoaded) {
    return (
      <main>
        <h1>Studio Ghibli Films</h1>
        <input 
          placeholder="Search Title"
          value={this.state.title} 
          onChange={this.handleInput}/>
          <Button onClick={() => window.location.reload(false)}>Click to reload!</Button>
        <ul>
          {this.filterResults()}
        </ul>
      </main>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

}



export default App;
