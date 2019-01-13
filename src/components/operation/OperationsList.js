import React from 'react';
import ReactTable from "react-table";
import Navigation from "../Navigation";
import 'react-month-picker/css/month-picker.css'
import MonthPickerInput from "react-month-picker-input";


class OperationsList extends React.Component {

    constructor(props) {
        super(props);
        this._selectedMonthYear = null;
        console.log(this._selectedMonthYear);
        this.state = {
            id: localStorage.getItem('userSecretId'),
            selected: [],
            selectedNames: [],
            month: null,
            year: null,
            rowsNum: 0,
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        this.findAllForUser();
    }

    render() {
        console.log("renderTable");

        const columns = [{
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
                    style={{width: '15px', height: '15px'}}
                    type="checkbox"
                    className="checkbox"
                    onChange={() => this.onCheckboxChange(original.id)}
                />);
            }
        }
        ];
        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <h1 className="page-header">Operations List</h1>
                    <input ref={input => (this._article = input)}
                           id="article"
                           name="article"
                           required="true"
                           placeholder="Article"/>

                    <div style={{width: '200px'}}>
                        <label className="item-font-color">Pick A Month</label>
                        <button className="button-position" style={{right: '250px'}}
                                onClick={this.findHandleClick}>Find
                        </button>
                        <button className="button-position" style={{right: '150px'}}
                                onClick={this.clearHandleClick}>Clear
                        </button>
                        <button className="deletion-button" onClick={this.deleteHandleClick}>Delete</button>
                        <MonthPickerInput
                            id="dateOperation"
                            className="calendar-container-s button-position input"
                            // month={this.state.month}
                            // year={this.state.year}
                            // value={this._selectedMonthYear}
                            style={{width: '200px'}}
                            onChange={(item, i, k) => {
                                console.log(item + ' ' + i + ' ' + k);
                                this._selectedMonthYear = (k + 1) + '-' + i;
                                this.setState({year: i, month: k});
                            }}
                        />
                    </div>
                    <ReactTable
                        style={{margine: '20px'}}
                        className="item-font-color"
                        data={this.state.items}
                        columns={columns}
                        showPagination={true}
                        loadingText=""
                        defaultPageSize={10}
                        defaultSorted={[{id: "createDate", desc: true}, {id: "articleName", desc: false}]}
                    />

                </div>
            </div>
        );
    }

    findHandleClick = () => {
        console.log("find " + this._article.value.length);
        console.log("find " + this._selectedMonthYear);
        console.log("find " + this.state.year);
        if (this._article.value.length > 0 && this._selectedMonthYear === null) {
            this.findByArticle();
        } else if (this._article.value.length === 0 && this._selectedMonthYear !== null) {
            this.findByDate()
        } else if (this._article.value.length > 0 && this._selectedMonthYear !== null) {
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
                this.setState({items: data, rowsNum: data.length});
                console.log('tn ' + this.state.rowsNum);
                if (this.state.rowsNum > 0) {
                    this.render();
                }
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
                    alert("Параметры фильтра не корректны. Статья не найдена. Будут показаны все операции");
                    this.clearHandleClick();
                    this.findAllForUser();
                    return;
                }
                this.setState({items: data});
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
    }

    findByDate() {
        console.log("find by date");
        fetch("http://localhost:8080/operation/" + this.state.id + '/monthYear/' + this._selectedMonthYear, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                if (data.status === 500) {
                    alert("Параметры фильтра не корректны. Будут показаны все операции");
                    this.clearHandleClick();
                    this.findAllForUser();
                    return;
                }
                this.setState({items: data});
            })
            .catch((error) => {
                this.props.history.push("/login")
            });
    }

    findByArticleAndDate() {
        fetch("http://localhost:8080/operation/" + this.state.id + '/article/' + this._article.value + '/monthYear/' + this._selectedMonthYear, {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                if (data.status === 500) {
                    alert("Параметры фильтра не корректны. Будут показаны все операции");
                    this.clearHandleClick();
                    this.findAllForUser();
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
        console.log("clear");
        this._selectedMonthYear = "";
        this.setState({year: undefined, month: undefined});
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
