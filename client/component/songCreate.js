import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchsongs';

class songcreate extends Component {

    constructor(props) {
        super(props);

        this.state = { title: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        }).then(() => {
            hashHistory.push('/')
        })
        console.log(this.props);
    }


    render() {
        return (
            <div>
                <h3>Creating a song......</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title :</label>
                    <input onChange={event => this.setState({ title: event.target.value })} value={this.state.title} />
                </form>
                <Link
                    to="/"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">flight_takeoff</i>
                </Link>
            </div>
        );
    }


}

const mutation = gql`
mutation addSong($title: String) {
    addSong(title:$title){
        id,
        title
    }
}
`;

export default graphql(mutation)(songcreate);