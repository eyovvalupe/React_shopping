import React from 'react';
import { fetch } from '../fetch';
import { Spinner } from '../components/Spinner';
import { Track } from './Track';

class ArtistTopTracks extends React.Component {
  state = {
    tracks: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getArtistTopTracks();
  }

  getArtistTopTracks = () => {
    fetch(
      `https://api.spotify.com/v1/artists/${this.props.id}/top-tracks?market=US`
    )
      .then(res => res.json())
      .then(
        ({ tracks }) => this.setState({ tracks, isLoading: false }),
        error => {
          this.setState({ isLoading: false });
          throw new Error(error);
        }
      );
  };

  render() {
    const { tracks, isLoading } = this.state;

    return (
      <div className="topTracks">
        <h3 className="center">Top Tracks</h3>
        {isLoading ? (
          <Spinner className="center" />
        ) : (
          tracks &&
          tracks.length > 0 &&
          tracks
            .slice(0, 3)
            .map(track => <Track key={track.id} track={track} />)
        )}
      </div>
    );
  }
}

export default ArtistTopTracks;
