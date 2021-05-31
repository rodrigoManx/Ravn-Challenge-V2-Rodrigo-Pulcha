import React, { Component } from 'react';
import { StarWarsItemDetail } from '../components/StarWarsItemDetail'


const OBJECTS = {
    person: {
        name: "person",
        table: "people",
        relations: [
            {connection: 'vehicles', name: 'vehicles', information: "name", displayName: "Vehicles"},
            {connection: 'starships', name: 'starships', information: "name", displayName: "Starships"},
        ],
        generalInformation: [
            { property: 'eye_color', displayName: "Eye Color"},
            { property: 'hair_color', displayName: "Hair Color"},
            { property: 'skin_color', displayName: "Skin Color"},
            { property: 'birth_year', displayName: "Birth Year"},
        ]
    },
    starship: {
        name: "starship",
        table: "starship",
        relations: [
            {connection: 'pilots', name: 'pilots', information: "name", displayName: "Pilots"},
            {connection: 'films', name: 'films', information: "name", displayName: "Films"},
        ],
        generalInformation: [
            { property: 'model', displayName: "Model"},
            { property: 'cost_in_credits', displayName: "Cost in Credits"},
            { property: 'length', displayName: "Length"},
            { property: 'crew', displayName: "Crew"},
            { property: 'cargo_capacity', displayName: "Capacity"},
        ] 
    }
}


export default class StarWarsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            id: undefined,
            object: undefined
        };
    }

    componentDidMount() {
        if (this.props.match.params.object && this.props.match.params.id) {
            this.setState({
                object: this.props.match.params.object,
                id: this.props.match.params.id
            })
        }
    }
    
    render() {
        return (
            this.state.object && this.state.id? (
                <React.Fragment>
                    <StarWarsItemDetail
                        id={this.state.id}
                        object={OBJECTS[this.state.object]}
                        screen={this}
                    />
                </React.Fragment>
            ):(
                <div/>
            )
        );
    }
}