import React from 'react';
import ReactTable from "react-table";
import Navigation from "../Navigation";
import MonthPickerInput from "react-month-picker-input";

class Balance extends React.Component {

    constructor(props) {
        super(props);

        this._selectedMonthYear = null;
        this.state = {
            id: localStorage.getItem('userSecretId'),
            selected: [],
            selectedNames: [],
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
        this.getBalanceForUser();
    }

    getBalanceForUser() {
        fetch("http://localhost:8080/balance/" + this.state.id, {
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

    render() {
        console.log("renderTable");

        const columns = [
            {
                Header: 'Date',
                accessor: 'createDate',
                Cell: props => <span>{props.value.toString().slice(0, 10)}</span>
            }, {
                Header: 'Debit',
                accessor: 'debit',
            }, {
                Header: 'Credit',
                accessor: 'credit',
            }, {
                Header: 'Amount',
                accessor: 'amount',
            }
        ];


        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%', height: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <h1 className="page-header">Balance</h1>
                    <div style={{width: '200px'}}>
                        <label className="item-font-color">Pick A Month</label>
                        <button className="button-position" style={{right: '20%'}}
                                onClick={this.createHandleClick}>Create
                        </button>
                        <button className="deletion-button" onClick={this.deleteHandleClick}>Delete</button>
                        <MonthPickerInput className="calendar-container-s button-position input"
                                          style={{width: '400px'}}
                                          onChange={(item, i, k) => {
                                              console.log(item + ' ' + i + ' ' + k);
                                              this._selectedMonthYear = (k + 1) + '-' + i;
                                          }}
                        />
                    </div>
                    <ReactTable className="item-font-color"
                                data={this.state.items}
                                columns={columns}
                                showPagination={true}
                                loadingText=""
                                defaultPageSize={10}
                    />
                </div>
            </div>
        );
    }


    createHandleClick = () => {

        var balance = {
            userId: this.state.id,
        };
        var balanceJson = JSON.stringify(balance);
        console.log(balanceJson);

        fetch("http://localhost:8080/balance/" + this._selectedMonthYear, {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json',
            },
            body: balanceJson
        }).then(res => {
            if (res.ok) {
                this.getBalanceForUser();
            } else {
                alert("Не удалось сохранить операцию. Нельзя создавать 2 баланса за один период," +
                    " так же нельзя создать баланс за период предшевствующий последнему существующему балансу.");
            }
        });
    };

    deleteHandleClick = () => {
        fetch("http://localhost:8080/balance/" + this.state.id, {
            method: "DELETE",
            dataType: "JSON",
        })
            .then(res => {
                if (res.status === 500) {
                    alert("Невозможно удалить баланс");
                } else {
                    this.getBalanceForUser();
                }
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    };


}


export default Balance;
