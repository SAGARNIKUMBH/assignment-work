import React, { Component } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import NavBar41 from "./NavBar41";
import "bootstrap/dist/css/bootstrap.css";

class AssFrom41 extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userList: [],
      pageSize: 5,
      pageNo: 1,
      totalPages: 0,
      currentPageList: [],
      searchQuery: "",
    };
  }

  getCurrentPages = (pageNo, result) => {
    if (pageNo < 1) {
      return;
    }
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);

    const { searchQuery } = this.state;

    console.log(this.state);
    const start = (pageNo - 1) * this.state.pageSize;
    const end = pageNo * this.state.pageSize;
    const filtered = result?.filter((user) => {
      return `${user?.name?.title} ${user?.name?.first} ${user?.name?.last} `
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase());
    });
    const slicedResult = filtered?.slice(start, end);

    if (start < result?.length) {
      this.setState({
        currentPageList: slicedResult,
        totalPages: Math.ceil(filtered?.length / this.state.pageSize),
        pageNo: pageNo,
        loading: false,
      });
    }
  };

  componentDidMount() {
    axios.get("https://randomuser.me/api?results=50").then((result) => {
      this.setState({ userList: result.data.results });
      this.getCurrentPages(this.state.pageNo, result.data.results);
    });
  }

  render() {
    const { currentPageList, pageNo, userList, totalPages, searchQuery } =
      this.state;
    return (
      <div>
        <NavBar41 />
        <br />
        <h2>List Of Post Request Data</h2>
        <br />
        {this.state.loading && <Spinner />}

        <div className="d-flex justify-content-center">
          <div className="d-flex w-41">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              className="form-control me-2"
              aria-label="Search"
              onChange={(e) => {
                this.setState({ searchQuery: e.target.value }, () => {
                  this.getCurrentPages(this.state.pageNo, this.state.userList);
                });
              }}
            />
          </div>
        </div>
        {currentPageList.map((user, index) => {
          return (
            <div key={index}>
              <ul key={index}>
                {`${user?.name?.title} ${user.name.first} ${user.name.last}`}
              </ul>
            </div>
          );
        })}

        <button
          disabled={pageNo <= 1}
          onClick={() => {
            this.getCurrentPages(pageNo - 1, userList);
            this.setState({
              loading: true,
            });
          }}
        >
          &larr; Previous
        </button>

        {[...Array(this.state.totalPages).keys()].map((el) => {
          return (
            <button
              onClick={() => {
                this.getCurrentPages(el + 1, userList);
                this.setState({
                  loading: true,
                });
              }}
              style={
                pageNo === el + 1
                  ? { color: "white", backgroundColor: "black" }
                  : {}
              }
            >
              {el + 1}
            </button>
          );
        })}

        <button
          onClick={() => {
            this.getCurrentPages(pageNo + 1, userList);
            this.setState({
              loading: true,
            });
          }}
          disabled={pageNo >= totalPages}
        >
          Next &rarr;
        </button>
      </div>
    );
  }
}

export default AssFrom41;
