export default class randomUsersService {
  _apiURL = "https://randomuser.me/api/?results=15";

  date = new Date();

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  sortData = (arr) => {
    let newArr = [];

    this.months.forEach((month) => {
      arr.forEach((user) => {
        const modifiedUserArray1 = user.dateOfBirthday.split(" ")[1];
        if (month === modifiedUserArray1) {
          newArr.push(user);
        }
      });
    });
    // eslint-disable-next-line
    newArr = newArr.sort((user1, user2) => {
      const modifiedUserArray1 = user1.dateOfBirthday.split(" ");
      const modifiedUserArray2 = user2.dateOfBirthday.split(" ");
      if (modifiedUserArray1[1] === modifiedUserArray2[1]) {
        return modifiedUserArray1[0] - modifiedUserArray2[0];
      }
    });
    return newArr;
  };

  transformData = (item, id) => {
    const {
      name: { first, last },
      dob: { date },
      picture: { thumbnail },
    } = item;
    const dateOfBirthday = new Date(date)
      .toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })
      .split(" ")
      .reverse()
      .join(" ");

    return {
      name: `${first} ${last}`,
      dateOfBirthday,
      picture: thumbnail,
      id,
    };
  };

  findIdx(arr, arr2) {
    const monthArray = arr.map(
      ({ dateOfBirthday }) => dateOfBirthday.split(" ")[1]
    );
    return monthArray.indexOf(arr2[0].dateOfBirthday.split(" ")[1]);
  }

  getUserHavingBirthday(arr) {
    return arr.filter(({ dateOfBirthday }) => {
      return dateOfBirthday.split(" ")[1] === this.months[this.date.getMonth()];
    });
  }

  refactorBirthdayArray = (arr, arr2) => {
    if (arr2.length === 0) return arr;

    const idx = this.findIdx(arr, arr2);
    const oldArray = [...arr.splice(idx, arr2.length)];
    const nowDateNumber = +this.date.toDateString().split(" ")[2];
    const newArray = oldArray.filter(({ dateOfBirthday }) => {
      return +dateOfBirthday.split(" ")[0] > nowDateNumber;
    });

    return [...newArray, ...arr, ...oldArray.splice(newArray.length)];
  };

  fetchData = async () => {
    const data = await fetch(this._apiURL);
    if (!data.ok) {
      throw new Error(`Could not fetch ${this._apiURL}, status ${data.status}`);
    }
    return await data.json();
  };

  getPeople = async () => {
    const data = await this.fetchData();
    const modiefiedData = data.results.map((item, idx) =>
      this.transformData(item, idx)
    );
    const sortedPeople = this.sortData(modiefiedData);

    const birthdaysInThisMonth = this.getUserHavingBirthday(sortedPeople);

    return this.refactorBirthdayArray(sortedPeople, birthdaysInThisMonth);
  };

  getNumberOfBirthDaysInThisMonth = async () => {
    const data = await this.fetchData();
    const modiefiedData = data.results.map((item, idx) =>
      this.transformData(item, idx)
    );
    return this.getUserHavingBirthday(modiefiedData).length;
  };
}
