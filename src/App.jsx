import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './actions/auth';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateArticle from './components/article/CreateArticle';
import ViewArticle from './components/article/ViewArticle';
import AllArticles from './components/article/AllArticles';
import ProfilePage from './components/profile/Profile';
import SocialLogin from './components/auth/SocialMediaLogin';
import PasswordReset from './components/auth/PasswordReset';
import UpdatePassword from './components/auth/UpdatePassword';
import NavBar from './components/presentation/NavBar';
import Footer from './components/presentation/Footer';
import NotFoundPage from './components/404/NotFoundPage';
import SearchResult from './components/search/SearchResult';
import AllUserArticles from './components/profile/articles/AllUserArticles';
import PrivateRoute from './components/auth/PrivateRoute';

class App extends Component {
  async componentDidMount() {
    const { getLoggedInUser: getUser } = this.props;
    await getUser();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/create-article" component={CreateArticle} />
            <Route path="/articles/:slug" component={ViewArticle} />
            <Route path="/articles" component={AllArticles} />
            <PrivateRoute path="/profile" component={ProfilePage} exact />
            <PrivateRoute path="/profile/articles" component={AllUserArticles} exact />
            <Route path="/social" component={SocialLogin} />
            <Route path="/search" component={SearchResult} />
            <Route path="/reset-password" component={PasswordReset} />
            <Route path="/update-password" component={UpdatePassword} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  null,
  { getLoggedInUser },
)(App);
