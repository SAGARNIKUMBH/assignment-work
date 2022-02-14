import React, { Component } from "react";
import axios from "axios";

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: [],
      data1: [],
      collapseState: {
        currentIndex: -1,
        isOpen: false,
        post: null,
      },
    };
  }

  // componentDidMount() {
  //   axios
  //     .get("https://www.boredapi.com/api/activity")
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({ results: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       this.setState({ errorMsg: "Error retreiving data" });
  //     });
  // }
  handleClick = () => {
    console.log("Next");
    axios
      .get("https://www.boredapi.com/api/activity")
      .then((response) => {
        this.setState({
          activity: [...this.state.activity, response.data],
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: "Error retreiving data" });
      });
  };

  HandleExpandClick = (clickedIndex, currentIndex, isOpen, post) => {
    if (clickedIndex !== currentIndex && currentIndex !== -1) {
      this.setState({
        collapseState: {
          currentIndex: currentIndex,
          isOpen: false,
        },
      });
    }
    this.setState((prevState) => ({
      collapseState: {
        currentIndex: clickedIndex,
        isOpen: !prevState.collapseState.isOpen,
        post: post,
      },
    }));
  };

  render() {
    const { collapseState, activity } = this.state;
    console.log(activity);

    return (
      <div className="main">
        <div className="Activity">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleClick}
          >
            Generate Activity
          </button>

          <div className="mt-3 h5">
            {activity
              ? activity.map((post, index) => (
                  <div className="mt-3" key={index}>
                    {
                      <li>
                        {post.activity}{" "}
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() =>
                            this.HandleExpandClick(
                              index,
                              collapseState.currentIndex,
                              collapseState.isOpen,
                              post
                            )
                          }
                        >
                          {collapseState.currentIndex === index &&
                          collapseState.isOpen
                            ? "Collapse"
                            : "Expand"}
                        </button>
                        <li
                          style={{
                            display:
                              collapseState.currentIndex === index &&
                              collapseState.isOpen
                                ? "block"
                                : "none",
                          }}
                        >
                          <div className="mt-3">
                            {this.state.collapseState.post &&
                              Object.entries(this.state.collapseState.post).map(
                                ([key, value]) => {
                                  return (
                                    <div key={key}>
                                      <menu>
                                        <li>
                                          {key} : {value}
                                        </li>
                                      </menu>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </li>
                      </li>
                    }
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Activity;
