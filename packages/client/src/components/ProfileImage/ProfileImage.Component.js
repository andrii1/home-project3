import React from 'react';
import PropTypes from 'prop-types';
import './ProfileImage.Style.css';

export const ProfileImage = ({ name }) => {
  const nameInitial = name[0] ? name[0] : '';

  return <span className="user-profile-image">{nameInitial}</span>;
};

ProfileImage.propTypes = {
  name: PropTypes.string,
};

ProfileImage.defaultProps = {
  name: null,
};
