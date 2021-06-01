import React, { Component } from 'react';
import { StarWarsListInfiniteScroll } from '../components/StarWarsListInfiniteScroll';
import { Header } from '../components/Header';
import { STAR_WARS_PEOPLE, STAR_WARS_STARSHIPS } from '../services/StarWarsApiService';

const OBJECTS = {
    starships: {
        name: "Starships",
        query: STAR_WARS_STARSHIPS,
        field: "allStarships",
        path: "/detail/starship/",
        pathKey: "id",
        description: (data) => {
            let starshipClass = data.starshipClass? data.starshipClass : "Unknown";
            starshipClass = starshipClass.charAt(0).toUpperCase() + starshipClass.slice(1)
            return starshipClass + " class";
        }
    },
    people: {
        name: "People",
        query: STAR_WARS_PEOPLE,
        field: "allPeople",
        path: "/detail/person/",
        pathKey: "id",
        description: (data) => {
            let specie = data.species.edges.length > 0? data.species.edges[0].node.name : "Human";
            let homeworld = data.homeworld? data.homeworld.name : "Tatooine";
            return specie + " from " + homeworld;
        }
    },
}

export default class StarWarsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            object: undefined
        };
    }

    componentDidMount() {
        if (this.props.match.params.object) {
            this.setState({object: this.props.match.params.object})
        }
    }
    
    render() {
        return (
            this.state.object?(
                <React.Fragment>
                    <Header title={OBJECTS[this.state.object].name + " of Star Wars"} canBack={true}/>
                    <StarWarsListInfiniteScroll object={OBJECTS[this.state.object]}/>
                </React.Fragment>
            ):(
                <div/>
            )
        );
    }
}