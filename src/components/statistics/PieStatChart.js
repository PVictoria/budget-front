import React, {Component} from "react";
import PieChart from 'react-minimal-pie-chart';
import 'react-minimal-pie-chart/dist/index'
import MonthPickerInput from 'react-month-picker-input';
import {Legend} from 'react-easy-chart'
// import Picker from 'react-month-picker'
// import 'react-month-picker/css/month-picker.css'
// import "../style/style.css";
// import 'react-month-picker/scss/month-picker.scss'
import 'react-month-picker-input/dist/react-month-picker-input.css'

export default class PieStatChart extends Component {
    constructor(props) {
        super(props);
        this._selectedMonthYear = {};
    }

    render() {
        var data = [
            {
                title: 'One',
                text: "TTT",
                value: 10,
                tag: 'ddd',
                label: 'ffff',
                name: 'name',
                key: '123',
                color: '#E38627'
            },
            {title: 'Two', value: 15, color: '#C13C37'},
            {title: 'Three', value: 20, color: '#6A2135'},
        ];

        let pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            , from: 'From', to: 'To'
        }
            , mvalue = {year: 2015, month: 11}
            , mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}};

        let makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year);
            return '?'
        };

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

        return (

            <div>

                <label>Pick A Month</label>

                <div style={{width: '400px'}}>
                    <MonthPickerInput
                        year={2018}
                        month={8}
                        onChange={(item, i, k) => {
                            console.log(item + ' ' + i + ' ' + k);
                            this._selectedMonthYear = k + '-' + i;
                        }}
                    />
                </div>


                <div className="App">
                    <h1>My First LineChart</h1>
                    <div style={{width: '150px'}}>
                        <PieChart

                            labels
                            data={data}
                        />

                        <PieChart
                            labels={true}
                            data={[
                                {key: 'A', value: 100, color: '#000000'},
                                {key: 'B', value: 200, color: '#ff77ff'},
                                {key: 'C', value: 50, color: '#e3a51a'}
                            ]}
                            styles={{
                                '.chart_text': {
                                    fontSize: '14px',
                                    fill: '#fff'
                                }
                            }}
                        />
                        <Legend data={data}
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