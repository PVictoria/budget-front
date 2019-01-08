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
            // selectedDate: null,
            items: []
        };
        this.deleteHandleClick = this.deleteHandleClick.bind(this);
    }

    componentDidMount() {
        console.log("mount");
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

        const columns = [{
            Header: 'Debit',
            accessor: 'debit',
        }, {
            Header: 'Credit',
            accessor: 'credit',
        }, {
            Header: 'Amount',
            accessor: 'amount',
        }, {
            Header: 'Date',
            accessor: 'createDate',
            Cell: props => <span>{props.value.toString().slice(0, 10)}</span>
        }
        ];


        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15" style={{width: '75%'}}>
                    <h1>Balance</h1>
                    <div style={{width: '400px'}}>
                        <label>Pick A Month</label>
                        <MonthPickerInput
                            onChange={(item, i, k) => {
                                console.log(item + ' ' + i + ' ' + k);
                                this._selectedMonthYear = (k + 1) + '-' + i;
                            }}
                        />
                    </div>
                    <button onClick={this.createHandleClick}>Create</button>
                    <button onClick={this.deleteHandleClick}>Delete</button>
                    <ReactTable data={this.state.items}
                                columns={columns}
                    />
                </div>
            </div>
        );
    }


    createHandleClick = () => {

        // var date = document.getElementById("dateOperation").value;
        var balance = {
            userId: this.state.id,
            // createDate: date,
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
