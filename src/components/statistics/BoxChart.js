import React, {Component} from 'react';
import BarChart from 'react-bar-chart';
// import RTChart from 'react-rt-chart';
import Dropdown from "react-dropdown";
import * as d3 from "d3";

const data = [
    {text: 'Man', value: 500},
    {text: 'Woman', value: 300}
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};

export default class BoxChart extends Component {

    constructor(props) {
        super(props);
        this._selectedTime = 'year';

        this.state = {
            id: localStorage.getItem('userSecretId'),
            width: 500,
            items: [],
            // data : []
        };
    }

    componentDidMount() {
        /*
           window.onresize = () => {
               this.setState({width: this.refs.root.offsetWidth});
           };
           */
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

        // this.state.items.forEach(value => this.state.data.push(value));


        console.log("new date " + new Date());
        const scale = d3.scaleOrdinal().range(['red', 'blue', 'green']);
        return (
            <div ref='root'>
                <Dropdown id={"time"}
                          name={"time"}
                          options={['year', 'allTime']}
                          value={this._selectedTime}
                          onChange={item => {
                              this._selectedTime = item.value;
                              this.getData();
                          }}
                          placeholder="Select time"
                          style={{width: '50px'}}/>
                <div style={{width: '50%'}}>
                    <BarChart colorByLabel={false}
                              colorScale={scale}
                              ylabel='Quantity'
                              width={this.state.width}
                              height={500}
                              margin={margin}
                              data={this.state.items}
                        // data={data}
                              onBarClick={this.handleBarClick}

                    />
                </div>
            </div>
        );
    }
}
