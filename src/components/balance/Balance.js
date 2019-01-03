import React from 'react';
import ReactTable from "react-table";
import Navigation from "../Navigation";
import DatePicker from "react-datepicker/es";

class Balance extends React.Component {

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
                    <DatePicker id={"dateOperation"}
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.selectedDate}
                                onChange={(date) => this.setState({selectedDate: date})}
                                placeholderText={"Select month"}
                                dropdownMode={"select"}/>
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

        var date = document.getElementById("dateOperation").value;
        var balance = {
            userId: this.state.id,
            createDate: date,
        };
        var balanceJson = JSON.stringify(balance);
        console.log(balanceJson);

        fetch("http://localhost:8080/balance", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json',
            },
            body: balanceJson
        }).then(res => {
            if (res.ok) {
                this.getBalanceForUser();
                //this.props.history.push("/operations")
            } else {
                alert("Не удалось сохранить операцию");
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
