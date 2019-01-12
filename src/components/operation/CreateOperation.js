import React from "react";
import Dropdown from 'react-dropdown';
import Navigation from "../Navigation";
import DatePicker from "react-datepicker";

import "../style/style.css";
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";

class CreateOperation extends React.Component {
    constructor(props) {
        super();
        console.log("local " + localStorage.getItem('userSecretId'));
        this.state = {
            id: localStorage.getItem('userSecretId'),
            selectedDate: null,
            items: [],

        }
    }

    componentDidMount() {
        if (this.state.id === 'null') {
            this.props.history.push('/login');
            return;
        }
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
        console.log("greeting " + this.state.id);
        if (this.state.id === undefined) {
            this.props.history.push('/login');
            return;
        }

        return (
            <div className="row" style={{height: '100%'}}>
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15 all-elements-padding" style={{width: '75%'}}>
                    <h1 className="page-header">Create Operation</h1>
                    <Dropdown id={"article"}
                              style={{'margin': '10px', 'width': '50px', 'padding': '0px'}}
                              name={"article"}
                              value={this._selectedArticle}
                              options={this.state.items.map(value => value.name)}
                              onChange={item => this._selectedArticle = item.value}
                              placeholder="Select an article"
                    />
                    <div>
                        <input id={"sum"}
                               style={{'margin-right': '20px'}}
                               ref={input => (this._sum = input)}
                               placeholder="Credit/debit"/>
                        <DatePicker style={{'margin': '10px'}}
                                    id={"dateOperation"}
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.selectedDate}
                                    onChange={(date) => this.setState({selectedDate: date})}
                                    placeholderText={"Select date"}
                                    dropdownMode={"select"}/>
                        <button className="button-color" style={{'margin': '10px', 'margin-left': '20px'}}
                                onClick={this.createHandleClick}>Create
                        </button>
                        <button className="button-color" style={{'margin': '10px'}}
                                onClick={this.cancelHandleClick}>Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    createHandleClick = () => {
        console.log("mm " + this._selectedArticle);
        var date = document.getElementById("dateOperation").value;
        console.log(document.getElementById("dateOperation").value);
        if (this._selectedArticle === undefined || this._sum.value === "" || this._sum.value === '0' || date === undefined || date === "") {
            alert("Не все поля заполнены");
            return;
        }
        var debit = null;
        var credit = null;
        console.log(parseInt(this._sum.value));
        if (parseInt(this._sum.value) > 0) {
            debit = this._sum.value
        } else {
            credit = this._sum.value
        }
        var operation = {
            userId: this.state.id,
            articleName: this._selectedArticle,
            createDate: date,
            debit: debit,
            credit: credit
        };
        var operationJson = JSON.stringify(operation);
        console.log(operationJson);

        fetch("http://localhost:8080/operation", {
            method: "POST",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json',
            },
            body: operationJson
        }).then(res => {
            if (res.ok) {
                this.props.history.push("/operations")
            } else {
                alert("Не удалось сохранить операцию");
            }
        });
    };

    cancelHandleClick = () => {
        //todo: replace with xPath expression
        console.log("clear");
        document.getElementsByClassName("Dropdown-root")[0].children[0].children[0].textContent = "Select an article";
        document.getElementById("sum").value = "";
        document.getElementById("dateOperation").value = "";
        this.setState({selectedDate: null});
    };
}

export default CreateOperation;