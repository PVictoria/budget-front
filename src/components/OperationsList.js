import React from 'react';
import ReactTable from "react-table";
import Navigation from "./Navigation";
// // import BootstrapTable, {TableHeaderColumn}  from "bootstrap";
// // import $ from 'jquery';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//

class OperationsList extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            id: localStorage.getItem('userSecretId'),
            selected: [],
            selectedNames: [],
            // selectAll: 0,
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        console.log("mount");
        fetch("http://localhost:8080/operation/" + this.state.id, {
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

    }

    render() {
        console.log("renderTable");

        const columns = [{
            Header: 'Code',
            accessor: 'id' // String-based value accessors!
        }, {
            Header: 'Article',
            accessor: 'articleName',
        }, {
            Header: 'Dedit',
            accessor: 'debit',
        }, {
            Header: 'Credit',
            accessor: 'credit',
        }, {
            Header: 'Date',
            accessor: 'createDate',
        }, {
            Header: 'Selection',
            accessor: '',
            Cell: ({original}) => {
                return (<input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => this.onCheckboxChange(original.id)}
                />);
            }
        }
        ];


        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15" style={{width: '75%'}}>
                    <h1>Operations List</h1>
                    <button onClick={this.deleteHandleClick}>Delete</button>
                    <ReactTable data={this.state.items}
                                columns={columns}
                    />

                </div>
            </div>
        );
    }

    onCheckboxChange(operationid) {
        console.log(operationid);
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[operationid] = !this.state.selected[operationid];
        this.setState({selected: operationid});
        if (this.state.selectedNames.indexOf(operationid) === -1) {
            this.state.selectedNames.push(operationid);
        } else {
            this.state.selectedNames.splice(this.state.selectedNames.indexOf(operationid), 1);
        }
        console.log("-------------");
        this.state.selectedNames.forEach(value => console.log('list ' + value));
        console.log("......................");

        // console.log(this.state.selectedNames.);
    };

    deleteHandleClick = () => {

        console.log("DELETEON-------------");
        this.state.selectedNames.forEach(value => {
            console.log('list ' + value)
            this.deleteArticle(value);
        });
        console.log("DELETEON......................");

        // console.log(this.state.selectedNames[1]);
        console.log(this.selectedNames);
        window.location.reload();

    };


    deleteArticle(value) {
        fetch("http://localhost:8080/operation/" + value, {
            method: "DELETE",
            dataType: "JSON",
        })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });

    }
}


export default OperationsList;
