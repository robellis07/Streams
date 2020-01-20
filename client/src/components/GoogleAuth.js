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
          scope: 'email profile'
        });
        this.google = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.google.isSignedIn.get());
        this.google.isSignedIn.listen(this.onAuthChange);
      });
    } catch (error) {
      console.error(error);
    }
  }

  onTrySignIn = () => {
    this.google.signIn();
  };

  onTrySignOut = () => {
    this.google.signOut();
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const user = this.google.currentUser.get();
      this.props.signIn(user.getId(), user.getBasicProfile().getEmail());
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
          {this.props.email} <br />
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

const mapStateToProps = a => {
  return {
    isSignedIn: a.authReduc.isSignedIn,
    userId: a.authReduc.userId,
    email: a.authReduc.email
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
