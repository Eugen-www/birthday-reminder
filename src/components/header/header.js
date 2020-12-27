import React, { Component } from "react";
import randomUsersService from "../../service/randomUsersService";

import "./header.css";

export default class Header extends Component {
  state = {
    birthdaysInThisMonth: null,
  };

  randomUsersService = new randomUsersService();

  componentDidMount() {
    this.randomUsersService
      .getNumberOfBirthDaysInThisMonth()
      .then((birthdaysInThisMonth) => this.setState({ birthdaysInThisMonth }));
  }

  render() {
    return (
      <div className="header">
        <div className="header__wrapper">
          <div className="header__data">{this.props.date.toDateString()}</div>
          <div className="header__text">
            <p className="header__birthdays">
              <span>{this.state.birthdaysInThisMonth}</span> birthdays in this
              month
            </p>
            <p className="header__tip">
              * don’t forget to congratulate them 😆
            </p>
          </div>
        </div>
      </div>
    );
  }
}
