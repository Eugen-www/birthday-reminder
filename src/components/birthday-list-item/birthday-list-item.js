import React from "react";

import "./birthday-list-item.css";

const BirthdayListItem = ({ info: { name, dateOfBirthday, picture } }) => {
  return (
    <div className="birthday-card">
      <div className="birthday-card__wrapper">
        <div className="birthday-card__left">
          <div className="birthday-card__img">
            <img src={picture} alt="person" />
          </div>
          <div className="birthday-card__left__text">
            <span>{name}</span>
            <span>{5} days later</span>
          </div>
        </div>
        <div className="birthday-card__right">
          <div className="birthday-card__right__text">
            <span>{dateOfBirthday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayListItem;
