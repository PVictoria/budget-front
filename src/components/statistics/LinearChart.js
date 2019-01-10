import React, {Component} from 'react';
import LineChart from 'react-linechart';
import 'react-linechart/dist/styles.css';
import Dropdown from "react-dropdown";
import Navigation from "../Navigation";

export default class LinearChart extends Component {

    constructor(props) {
        super(props);
        this._selectedTime = 'year';
        this._selectedArticle = '';

        this.state = {
            id: localStorage.getItem('userSecretId'),
            articles: [],
            items: [],
            data: [{color: "steelblue", name: "credit", points: []}, {color: "red", name: "debit", points: []}]
        };
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        fetch("http://localhost:8080/article", {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                this.setState({articles: data});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    }

    render() {
        this.updateLineValues();
        var dates = [];
        this.state.items.forEach(value => dates.push(value.xdate.toString()));
        dates.sort((a, b) => {
            if (a > b) {
                return -1;
            } else if (b > a) {
                return 1;
            } else {
                return 0;
            }
        });
        dates.forEach(value => console.log("log " + value));
        var maxDate = dates[0];
        var minDate = dates[dates.length - 1];
        console.log("maxDate  " + maxDate);
        console.log("minDate  " + minDate);
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <div className="App">
                        <h1>My First LineChart</h1>
                        <Dropdown id={"article"}
                                  name={"article"}
                                  options={this.state.articles.map(value => value.name)}
                                  value={this._selectedArticle}
                                  onChange={item => {
                                      this._selectedArticle = item.value;
                                      this.getData();
                                  }}
                                  placeholder="Select an article"
                                  style={{width: '50px'}}/>
                        <Dropdown id={"time"}
                                  name={"time"}
                                  options={['year', 'month', 'allTime']}
                                  value={this._selectedTime}
                                  onChange={item => {
                                      this._selectedTime = item.value;
                                      this.getData();
                                  }}
                                  placeholder="Select time"
                                  style={{width: '50px'}}/>
                        <LineChart
                            width={600}
                            height={400}
                            data={this.state.data}
                            isDate={true}
                            interpolate={'linear'}
                            showLegends={true}
                            ticks={5}
                            xMin={minDate}
                            xMax={maxDate}
                        />
                    </div>
                </div>
            </div>
        );
    }

    getData() {
        if (this._selectedArticle.length > 0) {
            fetch("http://localhost:8080/statistics/line/" + this.state.id + "/" + this._selectedTime + "/article/" + this._selectedArticle, {
                method: "GET",
                dataType: "JSON",
            })
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    this.setState({items: data});
                })
                .catch((error) => {

                    console.log(error, "catch the hoop")
                })
        }
    }

    updateLineValues() {
        this.state.data[0].points = [];
        this.state.data[1].points = [];
        this.state.items.forEach(value => {
            console.log("x " + value.xdate);
            var creditItem = {
                x: value.xdate,
                y: value.credit
            };
            var debitItem = {
                x: value.xdate,
                y: value.debit
            };
            this.state.data[0].points.push(creditItem);
            this.state.data[1].points.push(debitItem);
        });
    }
}