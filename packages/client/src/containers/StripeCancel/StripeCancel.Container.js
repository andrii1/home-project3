import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.component';
import './StripeCancel.Style.css';

export const StripeCancel = () => {
  return (
    <>
      <Helmet>
        <title>Stripe Cancel</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Oops...</h1>
        <p>Some payment issue</p>
        <Link to="/">
          <Button secondary label="Go to main page" />
        </Link>
      </main>
    </>
  );
};
