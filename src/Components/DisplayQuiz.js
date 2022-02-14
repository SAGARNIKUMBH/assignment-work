import React, { Component } from "react";
import { QUESTIONS } from "./Quiz";
import Spinner from "./Spinner";
import win from "./win-img.jpg";

class DisplayQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: QUESTIONS,
      currentQuestion: 0,
      score: 0,
      selectedAnser: "",
      loading: false,
    };
  }

  handleNextQuestion = () => {
    const { questions, currentQuestion, selectedAnser } = this.state;
    if (this.state.selectedAnser === "") {
      return;
    }

    const currentQuestions = questions[currentQuestion];
    const isCorrectAnswer =
      selectedAnser === currentQuestions.answers[currentQuestions.correct];

    if (isCorrectAnswer) {
      this.setState({ score: this.state.score + 20 });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      selectedAnser: "",
    });
  };
  handlePriviousQuestion = () => {
    const { questions, currentQuestion, selectedAnser } = this.state;

    // if (this.state.selectedAnser === "") {
    //   return;
    // }

    const currentQuestions = questions[currentQuestion];
    const isCorrectAnswer =
      selectedAnser === currentQuestions.answers[currentQuestions.correct];

    if (isCorrectAnswer) {
      this.setState({ score: this.state.score });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
    });
  };

  handleAnswerChange = (event) => {
    this.setState({ selectedAnser: event.target.value });
  };

  handleResetQuestions = () => {
    this.setState({
      currentQuestion: 0,
      score: 0,
      selectedAnser: "",
    });
  };

  render() {
    const { currentQuestion, questions } = this.state;
    return (
      <div className="Quiz">
        {questions.map((questionItem, index) => {
          return index === currentQuestion ? (
            <div>
              <h3>
                Q-{index + 1} . {questionItem.question}
                {this.state.loading && <Spinner />}
              </h3>
              <ul>
                {questionItem.answers.map((answerItem) => {
                  return (
                    <div className="">
                      <label htmlFor={answerItem} className="p-2">
                        {" "}
                        {answerItem}
                      </label>

                      <input
                        type="radio"
                        id={answerItem}
                        name={questionItem.question}
                        value={answerItem}
                        onChange={this.handleAnswerChange}
                      />
                    </div>
                  );
                })}
              </ul>
            </div>
          ) : null;
        })}

        {currentQuestion === questions.length ? (
          <div>
            {this.state.score >= 100 && <img src={win}></img>}
            <h1>Your Score is: {this.state.score}/100</h1>
          </div>
        ) : null}
        {currentQuestion < questions.length ? (
          <button
            disabled={this.state.currentQuestion > questions.length}
            onClick={this.handlePriviousQuestion}
          >
            privious
          </button>
        ) : null}
        {currentQuestion < questions.length ? (
          <button onClick={this.handleNextQuestion}>Next</button>
        ) : null}
        {currentQuestion === questions.length ? (
          <button onClick={this.handleResetQuestions}>Reset</button>
        ) : null}
      </div>
    );
  }
}

export default DisplayQuiz;
