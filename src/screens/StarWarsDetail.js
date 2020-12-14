import React, { Component } from 'react';
import { StarWarsItemDetail } from '../components/StarWarsItemDetail'
import { STAR_WARS_PERSON, STAR_WARS_STARSHIP } from '../services/StarWarsApiService';


const OBJECTS = {
    person: {
        name: "person",
        query: STAR_WARS_PERSON,
        relations: [
            {connection: 'vehicleConnection', name: 'vehicles', information: "name", displayName: "Vehicles"},
            {connection: 'starshipConnection', name: 'starships', information: "name", displayName: "Starships"},
        ],
        generalInformation: [
            { property: 'eyeColor', displayName: "Eye Color"},
            { property: 'hairColor', displayName: "Hair Color"},
            { property: 'skinColor', displayName: "Skin Color"},
            { property: 'birthYear', displayName: "Birth Year"},
        ]
    },
    starship: {
        name: "starship",
        query: STAR_WARS_STARSHIP,
        relations: [
            {connection: 'pilotConnection', name: 'pilots', information: "name", displayName: "Pilots"},
            {connection: 'filmConnection', name: 'films', information: "title", displayName: "Films"},
        ],
        generalInformation: [
            { property: 'model', displayName: "Model"},
            { property: 'costInCredits', displayName: "Cost in Credits"},
            { property: 'length', displayName: "Length"},
            { property: 'crew', displayName: "Crew"},
            { property: 'cargoCapacity', displayName: "Capacity"},
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