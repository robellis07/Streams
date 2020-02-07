import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  onSubmit = async formValues => {
    const { id } = this.props.match.params;
    this.props.editStream(id, formValues);
  };

  render() {
    const { title, description } = this.props.stream;

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={{
            title: title,
            description: description
          }}
          onSubmit={this.onSubmit}
        />
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

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
