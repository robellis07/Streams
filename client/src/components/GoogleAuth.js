import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    try {
      window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          clientId:
            '649863271420-tkc9gksv5pt6d4nhhmhr1dr7qjei1ccf.apps.googleusercontent.com',
          scope: 'email'
        });
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    } catch (error) {
      console.error(error);
    }
  }

  onTrySignIn = () => {
    this.auth.signIn();
  };

  onTrySignOut = () => {
    this.auth.signOut();
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onTrySignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onTrySignIn}>
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
