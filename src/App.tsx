import React from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

type State = {
  query: string;
};

export class App extends React.Component<{}, State> {
  state: State = {
    query: '',
  };

  changeSearchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event?.target.value,
    });
  };

  render() {
    const { query } = this.state;

    const visibleMovies = [...moviesFromServer].filter(movie => {
      const lowerCaseQuery = query.toLowerCase();

      return movie.title.toLowerCase().includes(lowerCaseQuery)
        || movie.description.toLowerCase().includes(lowerCaseQuery);
    });

    return (
      <div className="page">
        <div className="page-content">
          <div className="box">
            <div className="field">
              <label htmlFor="search-query" className="label">
                Search movie
                <div className="control">
                  <input
                    type="text"
                    id="search-query"
                    className="input"
                    placeholder="Type search word"
                    value={this.state.query}
                    onChange={(event => this.changeSearchInputHandler(event))}
                  />
                </div>
              </label>
            </div>
          </div>

          <MoviesList movies={visibleMovies} />
        </div>
        <div className="sidebar">
          Sidebar goes here
        </div>
      </div>
    );
  }
}
