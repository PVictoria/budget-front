import React from 'react';
import ReactTable from "react-table";
import Navigation from "./Navigation";
import 'react-month-picker/css/month-picker.css'
import DatePicker from "react-datepicker/es";


class OperationsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('userSecretId'),
            selected: [],
            selectedNames: [],
            selectedDate: null,
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        console.log("mount");
        this.findAllForUser();
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
                    <input ref={input => (this._article = input)}
                           id="article"
                           name="article"
                           required="true"
                           placeholder="New article"/>
                    <DatePicker id={"dateOperation"}
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.selectedDate}
                                onChange={(date) => this.setState({selectedDate: date})}
                                placeholderText={"Select month"}
                                dropdownMode={"select"}/>

                    <button onClick={this.findHandleClick}>Find</button>
                    <button onClick={this.clearHandleClick}>Clear</button>
                    <button onClick={this.deleteHandleClick}>Delete</button>
                    <ReactTable data={this.state.items}
                                columns={columns}
                    />

                </div>
            </div>
        );
    }

    findHandleClick = () => {
        console.log("find " + this._article.value.length);
        console.log("find " + this.state.selectedDate);
        if (this._article.value.length > 0 && this.state.selectedDate === null) {
            this.findByArticle();
        } else if (this._article.value.length === 0 && this.state.selectedDate !== null) {
            this.findByDate()
        } else if (this._article.value.length > 0 && this.state.selectedDate !== null) {
            this.findByArticleAndDate()
        } else {
            this.findAllForUser();
        }
    };


    findAllForUser() {
        fetch("http://localhost:8080/operation/" + this.state.id, {
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

    findByArticle() {
        fetch("http://localhost:8080/operation/" + this.state.id + '/article/' + this._article.value, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {

                if (data.status === 500) {
                    alert("Параметры фильтра не корректны");
                    return;
                }
                this.setState({items: data});
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
    }

    findByDate() {
        var date = document.getElementById("dateOperation").value;
        fetch("http://localhost:8080/operation/" + this.state.id + '/date/' + date, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                if (data.status === 500) {
                    alert("Параметры фильтра не корректны");
                    return;
                }
                this.setState({items: data});
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
    }

    findByArticleAndDate() {
        var date = document.getElementById("dateOperation").value;
        fetch("http://localhost:8080/operation/" + this.state.id + '/article/' + this._article.value + '/date/' + date, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                if (data.status === 500) {
                    alert("Параметры фильтра не корректны");
                    return;
                }
                this.setState({items: data});
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
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
            console.log('list ' + value);
            this.deleteArticle(value);
        });
        console.log("DELETEON......................");
        console.log(this.selectedNames);
        window.location.reload();

    };

    clearHandleClick = () => {
        document.getElementById("article").value = "";
        document.getElementById("dateOperation").value = "";
        this.setState({selectedDate: null});
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
