import React, {Component} from "react";
import PieChart from 'react-minimal-pie-chart';

export default class PieStatChart extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <h1>My First LineChart</h1>
                    <div style={{width: '150px'}}>
                        <PieChart

                            data={[
                                {title: 'One', text: "TTT", value: 10, tag: 'ddd', name: 'name'},//, color: '#E38627'},
                                {title: 'Two', value: 15, color: '#C13C37'},
                                {title: 'Three', value: 20, color: '#6A2135'},
                            ]}
                        />

                    </div>
                </div>
            </div>
        );
    }
}