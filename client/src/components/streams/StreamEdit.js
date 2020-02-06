import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  renderDesc() {
    const { stream } = this.props;

    if (stream) {
      return (
        <div>
          <label>Stream Name:</label>
          {stream.description}
        </div>
      );
    }
  }
  render() {
    console.log('props', this.props);

    return (
      <div>
        StreamEdit
        {this.renderDesc()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    stream: state.streams[id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);
