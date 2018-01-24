import React from "react";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";
import { connect } from "react-redux";
import { compose } from "redux";
import { push } from "react-router-redux";
import isMatch from "lodash.ismatch";
import MusicCard from "./../components/Dashboard/MusicCard";
import { signout } from "./../store/actions/user";
import { populate } from "./../utils";
import iTunes from "./../iTunes.svg";

const BrandTitle = styled.div`font-size: 40px;`;

class Dashboard extends React.Component {
  state = {
    data: null,
    filteredData: null,
    artists: null,
    trackNames: null,
    genres: null,
    prices: null,
    artistName: null,
    primaryGenreName: null,
    trackName: null,
    trackPrice: null,
    searchOptions: []
  };

  _searchItunes = async event => {
    const searchTerm = event.target.value;
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${searchTerm}`
      );
      const data = await response.data.results;
      this.setState({ data, filteredData: data });
      this._populateFilters(data);
    } catch (error) {
      console.log(error);
    }
  };

  _populateFilters = data => {
    const artists = populate(data, "artistName");
    const trackNames = populate(data, "trackName");
    const genres = populate(data, "primaryGenreName");
    const prices = populate(data, "trackPrice");

    this.setState({
      artists,
      trackNames,
      genres,
      prices
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.values(prevState.searchOptions).length !==
      Object.values(this.state.searchOptions).length
    ) {
      let searchOptionsWithValues = Object.assign(
        {},
        ...this.state.searchOptions.map(option => ({
          [option]: this.state[option]
        }))
      );

      let filteredData = this.state.data.filter(song => {
        return isMatch(song, searchOptionsWithValues);
      });
      this.setState({ filteredData });
      this._populateFilters(filteredData);
    }
  }

  _filter = (val, e) => {
    // let data = this.state.data;
    let searchTerm = val ? val.value : null;
    let searchOptions = this.state.searchOptions;
    let newSearchOptions = searchTerm
      ? [...searchOptions, e]
      : searchOptions.filter(n => n !== e);

    this.setState({
      [e]: searchTerm,
      searchOptions: newSearchOptions
    });
  };

  _logout = () => {
    window.localStorage.clear();
    this.props.logout();
    this.props.changeUrl("/");
  };

  render() {
    return (
      <div className="container">
        <header className="navbar">
          <section className="navbar-section">
            <a href="/" className="navbar-brand mr-2">
              <img
                src={iTunes}
                alt="iTunes App"
                style={{ padding: "10px", height: "100px" }}
              />
            </a>
            <BrandTitle>iTunes</BrandTitle>
          </section>
          <section className="navbar-center" style={{ flex: 2 }}>
            <div className="has-icon-left" style={{ width: "100%" }}>
              <input
                type="text"
                className="form-input input-lg"
                placeholder="Search your favorite song artist"
                onChange={this._searchItunes}
              />
              <i className="form-icon icon icon-search" />
            </div>
          </section>
          <section className="navbar-section">
            <div style={{ marginRight: "16px" }}>{this.props.user.name}</div>
            <button className="btn btn-primary" onClick={this._logout}>
              Logout
            </button>
          </section>
        </header>
        <div className="columns">
          <div className="column col-sm-6 mt-1">
            <Select
              name="artist"
              value={this.state.artistName}
              options={this.state.artists}
              placeholder="Select Artists"
              className="filterSelect"
              onChange={val => this._filter(val, "artistName")}
            />
          </div>
          <div className="column col-sm-6 mt-1">
            <Select
              name="trackNames"
              options={this.state.trackNames}
              value={this.state.trackName}
              placeholder="Select track"
              className="filterSelect"
              onChange={val => this._filter(val, "trackName")}
            />
          </div>
          <div className="column col-sm-6 mt-1">
            <Select
              name="genres"
              options={this.state.genres}
              value={this.state.primaryGenreName}
              placeholder="Select genre"
              className="filterSelect"
              onChange={val => this._filter(val, "primaryGenreName")}
            />
          </div>
          <div className="column col-sm-6 mt-1">
            <Select
              name="prices"
              options={this.state.prices}
              value={this.state.trackPrice}
              placeholder="Select Price"
              className="filterSelect"
              onChange={val => this._filter(val, "trackPrice")}
            />
          </div>
        </div>
        <div className="columns">
          {this.state.filteredData &&
            this.state.filteredData.map((e, i) => (
              <MusicCard info={e} key={i} />
            ))}
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(signout()),
  changeUrl: url => dispatch(push(url))
});

const withConnect = connect(mapPropsToState, mapDispatchToProps);

export default compose(withConnect)(Dashboard);
