import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.component';
import { useUserContext } from '../../userContext';
import './StripeSuccess.Style.css';

export const StripeSuccess = () => {
  const { user, customer } = useUserContext();
  return (
    <>
      <Helmet>
        <title>Purchase successful!</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Success!</h1>
        <p>Thank you for your purchase!</p>
        {user ? (
          <Link to="/questions/topic/1">
            <Button label="See all NGL bot messages" highlight />
          </Link>
        ) : (
          <>
            <p>
              You are not logged in. To see all NGL bot messages, you need to
              sign in or create account with the{' '}
              <strong>same email, which you used at a purchase.</strong>
            </p>
            <div className="container-login-stripe">
              <Link to="/signup">
                <Button primary label="Create an account" />
              </Link>
              or
              <Link to="/login">
                <Button secondary label="Log in" />
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};
