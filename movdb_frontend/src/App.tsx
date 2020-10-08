import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const test = gql`
  query movies {
      movies{
        id
        title
      }
    }
`
;

function App() {
  const { loading, error, data } = useQuery(test);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    return (
      <div>
        {data}
      </div>
    )
}

export default App;
