import React, {Component} from 'react';
import { StarWarsPerson, Header } from '../components/StarWarsPeoplePage'

export default class StarWarsPersonDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            id: undefined
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({id: this.props.match.params.id})
        }
    }
    
    render() {
        return (
            this.state.id? (
                <React.Fragment>
                    <Header title={this.state.name} canBack={true}/>
                    <StarWarsPerson personId={this.state.id} screen={this}/>
                </React.Fragment>
            ):(
                <div/>
            )
        );
    }
}