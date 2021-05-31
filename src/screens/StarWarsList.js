import React, { Component } from 'react';
import { StarWarsListInfiniteScroll } from '../components/StarWarsListInfiniteScroll';
import { Header } from '../components/Header';


const OBJECTS = {
    starships: {
        name: "Starships",
        table: "starship",
        field: "allStarships",
        path: "/detail/starship/",
        pathKey: "id",
        description: (data) => {
            let starshipClass = data.starship_class? data.starship_class : "Unknown";
            starshipClass = starshipClass.charAt(0).toUpperCase() + starshipClass.slice(1)
            return starshipClass + " class";
        }
    },
    people: {
        name: "People",
        table: "people",
        field: "allPeople",
        path: "/detail/person/",
        pathKey: "id",
        description: (data) => {
            let specie = data.species? data.species : "Human";
            let homeworld = data.homeworld? data.homeworld : "Tatooine";
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