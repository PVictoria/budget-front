import React, {Component} from 'react';
import BarChart from 'react-bar-chart';
import Dropdown from "react-dropdown";
import * as d3 from "d3";
import Navigation from "../Navigation";


const margin = {top: 20, right: 20, bottom: 30, left: 40};

export default class BoxChart extends Component {
    constructor(props) {
        super(props);
        // this.
        this._selectedTime = 'year';

        this.state = {
            id: localStorage.getItem('userSecretId'),
            width: 500,
            items: [],
            credit: [],
            debit: [],
            amount: [],
        };
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        this.getData();
    }


    getData() {
        fetch("http://localhost:8080/statistics/bar/" + this.state.id + "/" + this._selectedTime, {
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

    handleBarClick = (element, id) => {

        console.log(`The bin ${element.text} with id ${id} was clicked`);

    };

    render() {
        this.updateBarValues();
        console.log("new date " + new Date());
        const scale = d3.scaleOrdinal().range(['red', 'blue', 'green']);
        const timeRanges = [{value: 'year', label: 'За год'}, {value: 'allTime', label: 'За все время'}];
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%', 'margin-top': '20px'}}>

                    <Dropdown id={"time"}
                              name={"time"}
                              options={timeRanges}
                              value={this._selectedTime}
                              onChange={item => {
                                  this._selectedTime = item.value;
                                  this.getData();
                              }}
                              placeholder="Выберите период"
                              style={{width: '50px'}}/>

                    <div style={{width: '50%'}}>
                        <BarChart
                            colorByLabel={false}
                            colorScale={scale}
                            ylabel='Credit'
                            width={this.state.width}
                            height={200}
                            margin={margin}
                            data={this.state.credit}
                            onBarClick={this.handleBarClick}
                        />
                        <BarChart
                            colorByLabel={false}
                            colorScale={scale}
                            ylabel='Debit'
                            width={this.state.width}
                            height={200}
                            margin={margin}
                            data={this.state.debit}
                            onBarClick={this.handleBarClick}
                        />
                        <BarChart colorByLabel={false}
                                  colorScale={scale}
                                  ylabel='Amount'
                                  width={this.state.width}
                                  height={200}
                                  margin={margin}
                                  data={this.state.amount}
                                  onBarClick={this.handleBarClick}
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateBarValues() {
        this.state.credit = [];
        this.state.debit = [];
        this.state.amount = [];
        this.state.items.forEach(value => {
            var creditItem = {
                text: value.text,
                value: value.credit
            };
            var debitIdem = {
                text: value.text,
                value: value.debit
            };
            var amountItem = {
                text: value.text,
                value: value.amount
            };
            this.state.credit.push(creditItem);
            this.state.debit.push(debitIdem);
            this.state.amount.push(amountItem);
        });
    }
}
