import React, { Component } from 'react';

import { graphql } from 'react-apollo';

import { Link } from "react-router";

import fetchsong from "../queries/fetchsong";

class songdetail extends Component {

    render() {

        const { song } = this.props.data;

        if (!song) { return (<div>Loading...</div>) }

        return (
            <div>
                <Link to="/">
                    Back
                </Link>
                <h3>
                    {song.title}
                </h3>
            </div>
        );
    }


}


export default graphql(fetchsong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(songdetail);