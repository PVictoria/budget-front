import React from "react"
import Greeting from "./Greeting"


export default function MenuList({menulist}) {
    const menulistTitles = menulist.map(item =>
        <li key={item.id}><Greeting text={item}/></li>
    );

    return (
        <ul>
            {menulistTitles}
        </ul>
    )

}