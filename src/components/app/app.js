import React, { Component } from "react";
import DBService from "../../service/randomUsersService";
import BirthdayList from "../birthday-list/birthday-list";
import Header from "../header/header";
import "./app.css";

export default class App extends Component {
  state = {
    date: new Date(),
  };

  randomService = new DBService();

  render() {
    const { date } = this.state;

    return (
      <div className="app">
        <div className="app__container">
          <Header date={date} />
          <BirthdayList />
        </div>
      </div>
    );
  }
}
