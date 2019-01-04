import React, {Component} from "react";
import PieChart from 'react-minimal-pie-chart';
import 'react-minimal-pie-chart/dist/index'
import MonthPickerInput from 'react-month-picker-input';
import {Legend} from 'react-easy-chart'
import 'react-month-picker-input/dist/react-month-picker-input.css'

export default class PieStatChart extends Component {
    constructor(props) {
        super(props);
        this._selectedMonthYear = '12-2018';
        this.state = {
            id: localStorage.getItem('userSecretId'),
            articles: [],
            items: [],
            data: []
        }
    }

    componentDidMount() {
        console.log("mount");
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
        const config = [
            {color: '#aaac84'},
            {color: '#dce7c5'},
            {color: '#e3a51a'}
        ];
        var i = 0;
        this.state.items.forEach(value => {
            var item = {
                title: value.name,
                value: value.value,
                color: config[i].color
            };
            this.state.data.push(item);
            i = i + 1;
        });
        this.state.data.forEach(value => console.log(value.title + ' ' + value.value + ' ' + value.color));
    }

    render() {
        const config = [
            {color: '#aaac84'},
            {color: '#dce7c5'},
            {color: '#e3a51a'}
        ];
        const customStyle = {
            '.legend': {
                backgroundColor: '#f9f9f9',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '0.8em',
                maxWidth: '300px',
                padding: '12px'
            }
        };
        this.buildPieData();
        return (

            <div>

                <label>Pick A Month</label>

                <div style={{width: '400px'}}>
                    <MonthPickerInput
                        year={2018}
                        month={11}
                        onChange={(item, i, k) => {
                            console.log(item + ' ' + i + ' ' + k);
                            this._selectedMonthYear = (k + 1) + '-' + i;
                            this.getData();
                        }}
                    />
                </div>


                <div className="App">
                    <h1>My First LineChart</h1>
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
                                config={config}
                                styles={customStyle}
                                horizontal={true}/>
                    </div>
                </div>
            </div>
        );
    }
}