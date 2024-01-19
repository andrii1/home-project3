import React from 'react';
import { Route } from 'react-router-dom';

export default (
  <Route>
    <Route path="/" />
    <Route path="/questions" />
    <Route exact path="/questions/:id" />
    <Route exact path="/questions/topic/:topicIdParam" />
    <Route exact path="/faq" />
    <Route exact path="/login" />
    <Route exact path="/signup" />
    <Route exact path="/reset" />
    <Route exact path="/dashboard" />
  </Route>
);
