import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import appImage from '../../assets/images/app-placeholder.svg';

import './Card.styles.css';

export const Card = ({ title, description, topic, url }) => {
  return (
    <div className="card-category">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${appImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <div className="card-body">
        <div className="card-header">
          <Link to={`/apps/`} target="_blank">
            <h2>{title}</h2>
          </Link>
          <Link to={`/apps/`} target="_blank">
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" />
          </Link>
        </div>
        <div className="card-body">
          {' '}
          {description.split(' ').slice(0, 15).join(' ')}
        </div>
        <Button label={topic} size="sm" />
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.shape,
};

Card.defaultProps = {
  title: null,
  description: null,
  url: null,
};
