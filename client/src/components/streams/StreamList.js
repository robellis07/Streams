import React, { Component } from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  render() {
    return <div>StreamList</div>;
  }
}

const mapStateToProps = state => {};
export default connect(null, { fetchStreams })(StreamList);
