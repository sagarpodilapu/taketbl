import React from "react";
import reactCSS from "reactcss";
import TakeTblParent from "./TakeTblParent";
import Select from "react-select";

class RestaurantInfo extends TakeTblParent {
  constructor(props, context) {
    super(props);
    this.state = {
      ...this.state,
      selectedOption: null,
      restaurants: this.props.getRestaurants()
    };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleRestaurantInfoClick = e => {
    e.preventDefault();
    console.log("restaurint infor clicked");
  };

  componentWillMount() {
    // setInterval(timer, 1000);
    // function timer() {
    //   this.setState({
    //     count: (this.state.count -= 1) // mutating state directly here
    //   });
    // }
  }

  render() {
    const { restaurants } = this.state;
    const options = [
      { value: "chocolate", label: "Chocolate - Domlur" },
      { value: "strawberry", label: "Strawberry - Domlur" },
      { value: "vanilla", label: "Chocolate - Domlur" }
    ];
    const headers = {
      en: {
        Name: "Name",
        InfoHeader: "Restaurant Info",
        Phone: "Phone No",
        TotalSeats: "Total Seats",
        RemainingSeats: "Remaining Seats",
        WaitingListCapacity: " Waiting List Capcity"
      },
      ru: {
        Name: "название",
        InfoHeader: "Ресторан детали",
        Phone: "Телефон Число",
        TotalSeats: "Общее места",
        RemainingSeats: "остальной места",
        WaitingListCapacity: "емкость очереди"
      },
      be: {
        Name: "название",
        InfoHeader: "Ресторан детали",
        Phone: "Телефон Число",
        TotalSeats: "Общее места",
        RemainingSeats: "остальной места",
        WaitingListCapacity: "емкость очереди"
      }
    };
    const styles = reactCSS({
      default: {
        swatch: {
          backgroundColor: "grey"
        }
      }
    });
    let lang = this.state && this.state.lang ? this.state.lang : "en";
    return (
      <table width="100%" className="table table-sm">
        <tbody>
          <tr>
            <td style={styles.swatch}>{headers[lang].InfoHeader} </td>
            <td>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={this.handleRestaurantInfoClick}
              >
                ...
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={options}
              />
            </td>
          </tr>
          <tr>
            <td>{headers[lang].Name}:</td>
            <td>{restaurants}</td>
          </tr>
          <tr>
            <td>{headers[lang].Phone}:</td>
            <td>12345</td>
          </tr>
          <tr>
            <td>{headers[lang].TotalSeats}:</td>
            <td>
              <span id="totalseats"></span>200
            </td>
          </tr>
          <tr>
            <td>{headers[lang].RemainingSeats}:</td>
            <td>
              <span id="rseats">200</span>
            </td>
          </tr>
          <tr>
            <td>{headers[lang].WaitingListCapacity}</td>
            <td>
              <span id="rwaitlist">20</span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default RestaurantInfo;
