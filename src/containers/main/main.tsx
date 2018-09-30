import * as React from "react";
class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      initialDate: "",
      days: null,
      country: "",
      shouldRender: false,
    };
  }
  private this.counter = 0;
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  calculateMonthDifference = (endDate: Date, startDate: Date): number => {
    let monthDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    monthDifference += endDate.getMonth() - startDate.getMonth();
    let res = Math.abs(monthDifference);
    return res <= 0 ? 0 : res;
  }
  renderCalendar = () => {
    let { initialDate, days } = this.state;
    this.counter = 0;
    initialDate = initialDate.replace(/-/g, '/');
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let startDate = new Date(initialDate);
    let endDate = new Date(initialDate);
    endDate.setDate(startDate.getDate() + Number(days));
    let dif = this.calculateMonthDifference(endDate, startDate);
    let data = [];

    for (let i = 0; i < (dif + 1); ++i) {
      let tempData = new Date(initialDate);
      tempData.setMonth(tempData.getMonth() + i);
      let startingMonth = new Date(tempData.getFullYear(), tempData.getMonth());
      let daysInMonth = new Date(tempData.getFullYear(), tempData.getMonth(), 0).getDate();
      let currentMonth = startingMonth.getMonth();
      let getInitialDay = tempData.getDay();
      let daysArray = Array.apply(null, Array(startingMonth.getDay())).map((v: any, i: number) => 0).concat(Array.apply(null, Array(daysInMonth)).map((v: any, i: number) => i + 1));
      data.push({
        title: `${monthNames[currentMonth]} ${startingMonth.getFullYear()}`,
        days: daysArray
      });
    }
    return data.map((v: any, i: number) => {
      return <div key={"calendar-" + i}>
        <table>
          <thead>
            <tr><th colSpan={7}>{v.title}</th></tr>
            <tr>
              {weekdays.map((day: string, i: number) => {
                return <th key={"h-day-" + i}>{day}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {Array.apply(null, Array(Math.ceil(v.days.length / 7))).map((val: number, week: number) => {
              return <tr key={"week-" + (week + 1)} className="week-row">{this.renderWeekdays(week, v.days)}</tr>
            })}
          </tbody>
        </table>
      </div>
    });
  }
  renderWeekdays(week: number, daysArray: any) {
    return daysArray.slice(week * 7, (week * 7) + 7).map((day: number, i: number) => {
      let val = day ? day : "";
      let class_ = "empty";
      if (val && this.counter < Number(this.state.days)) {
        class_ = "valid";
      }
      if (i === 0 || i === 6) {
        class_ = "weekend";
      }
      if (val) {
        this.counter++;
      }
      return <td className={class_} key={"day-" + ((week + 1) * day + i)}>{val}</td>
    })
  }
  setRender = () => {
    this.setState({ shouldRender: true });
  }
  render() {
    return <div className="main-wrapper">
      <div className="input-group">
        <label>Start Date:</label>
        <input type="date" name="initialDate" onChange={this.handleChange} />
      </div>
      <div className="input-group">
        <label>Number of Days: </label>
        <input type="number" name="days" onChange={this.handleChange} />
      </div>
      <div className="input-group">
        <label>Country Code: </label>
        <input type="text" name="country" onChange={this.handleChange} />
      </div>
      <button onClick={this.setRender}>Render Calendar</button>
      {this.state.shouldRender && <div className="calendar-wrapper">{this.renderCalendar()}</div>}
    </div>
  }
}

export default Main;