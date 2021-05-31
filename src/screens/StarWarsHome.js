import React, { Component } from 'react';
import { Header } from '../components/Header';
import { ItemCell } from "../components/Cells"


const LISTS = [
    {
        name: "People from Stat Wars",
        path: "/list/people/",
    },
    {
        name: "Starships from Stat Wars",
        path: "/list/starships/",
    }
]

export default class StarWarsHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }
    
    render() {
        return (
            <React.Fragment>
                <Header title="Star Wars" canBack={false}/>
                {
                    LISTS.map((item, index) => (
                        <ItemCell key={index} data={item} object={{}}/>
                    ))
                }
            </React.Fragment>
        );
    }
}