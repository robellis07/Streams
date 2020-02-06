import React, { Component } from 'react';
import { fetchStreams } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUser) {
      const toEditStream = `/streams/edit/${stream.id}`;
      const toDeleteStream = `/streams/delete/${stream.id}`;
      return (
        <div className="right floated content">
          <Link to={toEditStream} className="ui button primary">
            Edit
          </Link>
          <Link to={toDeleteStream} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.currentUser) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUser: state.authReduc.userId,
    isSignedIn: state.authReduc.isSignedIn
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
