import React from 'react';
import ReactTable from "react-table";
// // import BootstrapTable, {TableHeaderColumn}  from "bootstrap";
// // import $ from 'jquery';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//
class MyTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }


    render() {


        const columns = [{
            Header: 'Name',
            accessor: 'id' // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'name',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
            {
                Header: 'Check',
                // accessor: 'name',
                Cell: props => <input
                    type="checkbox"
                    className="checkbox"
                    //                     // checked={this.state.selected[original.firstName] === true}
                    //                     // onChange={() => this.toggleRow(original.firstName)}
                />
                // <span className='number'>{props.value}</span> // Custom cell components!
            }
        ];


        fetch("http://localhost:8080/article", {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                const copy = resp.json();
                return copy;
            })
            .then((data) => {
                this.setState({items: data});
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
        return (
            <div>
                <ReactTable data={this.state.items}
                            columns={columns}
                    // className='my-table'
                    // defaultPageSize={10}
                    // className="-highlight"
                    // style = {{width: 300px;}}
                />

            </div>
        );
    }
}


export default MyTable;

// // ReactDOM.render(<MyTable />, document.getElementById("root"));
const data = [{
    name: 'Tanner Linsley',
    age: 26

}, {
    name: 'NNNNN',
    age: 27
}];
