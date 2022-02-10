import React, { Component } from "react";
// import loading from "../Iphone-spinner-1.gif";
import "../App.css";

class Spinner extends Component {
  render() {
    return (
      <div className={"loader"}>
        <div className={"spinner"}>Loading...</div>
      </div>
    );
  }
}

export default Spinner;
