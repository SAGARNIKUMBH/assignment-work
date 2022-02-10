import axios from "axios";
import React, { Component } from "react";

class AssignPostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      Search: "",
      loading: false,
      pageSize: 5,
      totalResults: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://randomuser.me/api?results=50")
      .then((response) => {
        console.log(response);
        this.setState({ results: response.data.results });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  }
  updateSearch(event) {
    this.setState({ Search: event.target.value });
  }

  handleprevClick = async () => {
    console.log("previous");
    axios
      .get("https://randomuser.me/api?results=5")
      .then((response) => {
        console.log(response);
        this.setState({ results: response.data.results });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });

    this.setState({
      page: this.state.page - 1,
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 5 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      axios
        .get("https://randomuser.me/api?results=5")
        .then((response) => {
          console.log(response);
          this.setState({ results: response.data.results });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMsg: "Error retreiving data" });
        });

      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  render() {
    const { results, errorMsg, search } = this.state;
    let results1 = results.filter((post) => {
      return (
        `${post.name.title} ${post.name.first} ${post.name.last}`
          .toLowerCase()
          .indexOf(this.state.Search.toLowerCase()) !== -1
      );
    });
    return (
      <div>
        <h2>List Of Post Request Data:-</h2>
        <div className="d-flex">
          <input
            value={search}
            onChange={this.updateSearch.bind(this)}
            type="search"
            placeholder="Search"
            className="form-control me-2 "
            aria-label="Search"
          />
        </div>
        <br />
        {results1
          ? results1.map((post, index) => (
              <div key={index}>
                {`${post?.name?.title} ${post.name.first} ${post.name.last}`}
              </div>
            ))
          : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
        <br />
        <div className="container.justify-content-md-center">
          {
            (this.state.page = 1 ? (
              ""
            ) : (
              <button
                disabled={this.state.page <= 5}
                type="button"
                className="btn btn-dark"
                onClick={this.handleprevClick}
              >
                &larr; Previous
              </button>
            ))
          }

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default AssignPostForm;
