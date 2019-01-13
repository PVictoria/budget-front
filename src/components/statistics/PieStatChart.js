import React, {Component} from "react";
import PieChart from 'react-minimal-pie-chart';
import 'react-minimal-pie-chart/dist/index'
import MonthPickerInput from 'react-month-picker-input';
import {Legend} from 'react-easy-chart'
import 'react-month-picker-input/dist/react-month-picker-input.css'
import Navigation from "../Navigation";

export default class PieStatChart extends Component {
    constructor(props) {
        super(props);

        this._selectedMonthYear = (new Date().getMonth() + 1) + '-' + new Date().getFullYear();
        this.color = [];
        this.state = {
            id: localStorage.getItem('userSecretId'),
            articles: [],
            items: [],
            data: []
        }
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        this.getData();
    }

    getData() {
        console.log("http://localhost:8080/statistics/pie/" + this.state.id + "/" + this._selectedMonthYear);
        fetch("http://localhost:8080/statistics/pie/" + this.state.id + "/" + this._selectedMonthYear, {
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
            });
    }

    buildPieData() {
        this.state.data = [];
        this.color = [];
        var i = 0;
        this.state.items.forEach(value => {
            const col = PieStatChart.getRandomColor();
            var colItem = {color: col};
            this.color.push(colItem);
            var item = {
                title: value.name,
                value: value.value,
                color: col
            };
            this.state.data.push(item);
            i = i + 1;
        });
        this.state.data.forEach(value => console.log(value.title + ' ' + value.value + ' ' + value.color));
    }

    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        this.buildPieData();
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <h1 className="page-header">Credit for all articles in chosen month</h1>
                    <label className="item-font-color">Pick A Month</label>
                    <div style={{width: '400px'}}>
                        <MonthPickerInput
                            year={2019}
                            month={0}
                            onChange={(item, i, k) => {
                                console.log(item + ' ' + i + ' ' + k);
                                this._selectedMonthYear = (k + 1) + '-' + i;
                                this.getData();
                            }}
                        />
                    </div>
                    <div>
                        <div style={{width: '150px'}}>
                            <PieChart
                                labels={true}
                                data={this.state.data}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '14px',
                                        fill: '#fff'
                                    }
                                }}
                            />
                            <Legend data={this.state.data}
                                    dataId={'title'}
                                    config={this.color}
                                    horizontal={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}