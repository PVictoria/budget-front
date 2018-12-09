import React, {Component} from "react";
import Navigation from "./Navigation";

class Greeting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []

        };
    }


    componentDidMount() {

        fetch("http://localhost:8080/1", {
            method: "GET",
            dataType: "JSON",
        })
            .then((resp) => {

                console.log("resp");
                const copy = resp.json();
                console.log(copy);
                return copy;
            })
            .then((data) => {
                console.log("data");
                const iii = data;
                console.log(iii);
                this.setState({items: data});
            })
            .catch((error) => {

                console.log(error, "catch the hoop")
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-3  menu-style" style={{width: '75%'}}><Navigation/></div>
                <div className="col-sm-15  menu-style" style={{width: '75%'}}>
                    <h2 className="menu-item-font  menu-style">Hello, {this.state.items.name}!</h2>
                </div>
            </div>
        )
    }
}

export default Greeting