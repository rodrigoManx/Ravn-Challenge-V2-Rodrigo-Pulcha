import React, {Component} from 'react';
import { StarWarsPeople, Header } from '../components/StarWarsPeoplePage'
import { STAR_WARS_PEOPLE } from '../services/StarWarsApiService';

export default class StarWarsPeopleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {}
    
    render() {
        return (
            <React.Fragment>
                <Header title="People of Star Wars" canBack={false}/>
                <StarWarsPeople query={STAR_WARS_PEOPLE}/>
            </React.Fragment>
        );
    }
}