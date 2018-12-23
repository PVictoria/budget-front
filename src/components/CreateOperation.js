import React from "react";
import Dropdown from 'react-dropdown';
import Navigation from "./Navigation";
import DatePicker from "react-datepicker";

import "./style.css";
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
        console.log("greeting " + this.state.id);
        if (this.state.id === undefined) {
            this.props.history.push('/login');
            return;
        }

        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '100%'}}><Navigation/></div>
                <div className="col-sm-15" style={{width: '75%'}}>
                    <h1>Create Operation</h1>
                    <Dropdown
                        options={this.state.items.map(value => value.name)}
                        onChange={item => this._selectedArticle = item.value}
                        placeholder="Select an article"
                        style={{width: '50px'}}/>
                    <input ref={input => (this._sum = input)}
                           placeholder="Credit/debit"/>
                    <DatePicker id={"dataOperation"}
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.selectedDate}
                                onChange={(date) => this.setState({selectedDate: date})}
                                placeholderText={"Select date"}
                                dropdownMode={"select"}/>
                    <button onClick={this.createHandleClick}>Create</button>
                    <button onClick={this.cancelHandleClick}>Cancel</button>


                </div>
            </div>
        );
    }

    createHandleClick = () => {
        console.log("mm " + this._selectedArticle);
        // console.log("mm " + this.state.selectedDate.toLocaleString().slice(0, 10));
        // console.log("sum " + this._sum.value);
        var date = document.getElementById("dataOperation").value;
        // if (this._article.value.length === 0) {
        //     alert("Название не может быть пустым");
        //     return;
        // }
        var debit = null;
        var credit = null;
        if (this._sum.value > 0) {
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
                this.props.history.push("/articles")
            } else {
                alert("Не удалось сохранить операцию");
            }
        });
    };

    cancelHandleClick = () => {
        document.getElementById("article").value = "";
    };
}

export default CreateOperation;