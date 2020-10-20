import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Router, Route, Switch } from "react-router-dom";

import { history } from "./helpers";

import Layout from "./containers/Layout";

import PostList from "./containers/post/postListView/PostList";
import PostDetail from "./containers/post/postDetailView/PostDetail";
import PostCreate from "./containers/post/postCreateView/PostCreate";
import PostUpdate from "./containers/post/PostUpdateView/PostUpdate";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/account/login/Login";
import signup from "./containers/account/signup/Signup";

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <PrivateRoute path="/create" component={PostCreate} />
          <Route exact path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={signup} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
