import React from 'react';
import { Spinner } from './Spinner';
import { Track } from './Track';
import { fetchArtistTopTracksJSON } from '../api';

import { unstable_createResource } from 'react-cache';

const ArtistTopTracksResource = unstable_createResource(
  fetchArtistTopTracksJSON
);

class ArtistTopTracks extends React.Component {
  render() {
    const tracks = ArtistTopTracksResource.read(this.props.id);
    return (
      <div className="topTracks">
        <h3>Top Tracks</h3>
        {tracks.slice(0, 3).map(track => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    );
  }
}

export default ArtistTopTracks;
