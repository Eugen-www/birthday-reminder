import React, { Component } from "react";
import randomUsersService from "../../service/randomUsersService";
import BirthdayListItem from "../birthday-list-item/birthday-list-item";
import Spinner from "../spinner/spinner";

import "./birthday-list.css";

export default class BirthdayList extends Component {
  state = {
    people: null,
  };

  randomUsersService = new randomUsersService();

  componentDidMount() {
    this.randomUsersService
      .getPeople()
      .then((people) => this.setState({ people }));
  }

  render() {
    const { people } = this.state;

    if (!people) return <Spinner />;

    const items = people.map(({ id, ...otherInfo }) => {
      return (
        <li key={id}>
          <BirthdayListItem info={otherInfo} />
        </li>
      );
    });

    return <ul className="birthday__list">{items}</ul>;
  }
}
