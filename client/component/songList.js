import React, { Component } from 'react';

import gql from 'graphql-tag';

import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchsongs';
class SongList extends Component {


    onsongdelete(id) {
        this.props.mutate({
            variables: {
                id: id
            }
        }).then(() => {
            this.props.data.refetch();
        })
        console.log(this.props);
    }



    rendersongs() {
        return this.props.data.songs.map(({ id, title },i) => {
            return (
                <Link to={`/song/${id}`}>
                    <li key={i} className="collection-item">
                        {title}
                        <i className="material-icons" onClick={() => this.onsongdelete(id)}>delete</i>
                    </li>
                </Link>
            )
        })
    }



    render() {
        if (this.props.data.loading) {
            return (
                <div> Loading ....</div>
            )
        } else {
            return (
                <div>
                    <ul className="collection">
                        {this.rendersongs()}

                    </ul>
                    <Link
                        to="/song/create"
                        className="btn-floating btn-large red right"
                    >
                        <i className="material-icons">add_circle</i>
                    </Link>
                </div>

            )
        }
    };
}

const mutation = gql`
mutation deleteSong($id:ID){
    deleteSong(id:$id){
        id
    }
}
`;


export default graphql(mutation)(graphql(query)(SongList));