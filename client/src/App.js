import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getPosts();
  };
  getPosts = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data.reverse();
        // console.log(data);
        this.setState({ posts: data });
        console.log("Data received");
      })
      .catch(() => {
        console.log("error while retrieving");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetInputs();
        this.getPosts();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  resetInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null;
    const allPosts = posts.map((post, index) => {
      return (
        <div key={index} className="display-post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      );
    });
    return allPosts;
  };

  // enterIsSubmit = (event) => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     this.submit();
  //   }
  // };

  render() {
    // console.log("state", this.state);
    return (
      <div className="App">
        <h1>Welcome to my first ever MERN App</h1>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              placeholder="Body"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button type="submit" className="">
            Submit
          </button>
        </form>
        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
