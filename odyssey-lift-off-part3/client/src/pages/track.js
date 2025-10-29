import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import TrackDetail from '../components/track-detail';
import { Layout, QueryResult } from '../components';

/** TRACK gql query to retrieve a specific track by ID */
const GET_TRACK = gql`
  query GetTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      numberOfViews
      modules {
        id
        title
        length
      }
      description
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Track = () => {

  const { trackId = '' } = useParams();
  
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId: trackId }
  });

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;