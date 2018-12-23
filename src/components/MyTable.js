import React from 'react';
import ReactTable from "react-table";
import Navigation from "./Navigation";
// // import BootstrapTable, {TableHeaderColumn}  from "bootstrap";
// // import $ from 'jquery';
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//

class MyTable extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            selected: [],
            selectedNames: [],
            // selectAll: 0,
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        console.log("mount");
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

    }

    render() {
        console.log("renderTable");

        const columns = [{
            Header: 'Code',
            accessor: 'id' // String-based value accessors!
        }, {
            Header: 'Name',
            accessor: 'name',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
            {
                Header: 'Selection',
                accessor: '',
                Cell: ({original}) => {
                    return (<input
                        type="checkbox"
                        className="checkbox"
                        // checked={this.state.selected[this.state.items.id]= true}
                        // onChange={() => this.toggleRow(this.state.items.id)}
                        onChange={() => this.onCheckboxChange(original.name)}
                    />);
                }
                // <span className='number'>{props.value}</span> // Custom cell components!
            }
        ];


        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15" style={{width: '75%'}}>
                    <h1>Articles</h1>
                    <input ref={input => (this._article = input)}
                           name="article"
                           required="true"
                           placeholder="Article"/>
                    <button onClick={this.createHandleClick}>Create</button>
                    <button onClick={this.deleteHandleClick}>Delete</button>
                    <ReactTable data={this.state.items}
                                columns={columns}
                    />

                </div>
            </div>
        );
    }

    onCheckboxChange(name) {
        console.log(name);
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[name] = !this.state.selected[name];
        this.setState({selected: name});
        if (this.state.selectedNames.indexOf(name) === -1) {
            this.state.selectedNames.push(name);
        } else {
            this.state.selectedNames.splice(this.state.selectedNames.indexOf(name), 1);
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

    createHandleClick = () => {
        fetch("http://localhost:8080/article", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name" : "' + this._article.value + '" }'
        });
        window.location.reload();
    };

    deleteArticle(value) {
        fetch("http://localhost:8080/article/" + value, {
            method: "DELETE",
            dataType: "JSON",
        })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });

    }
}


export default MyTable;