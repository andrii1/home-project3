import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './UpgradeModal.Style.css';
import Modal from '../Modal/Modal.Component';
import { apiURL } from '../../apiURL';
import { Button } from '../Button/Button.component';

const UpgradeModal = ({ toggle, open }) => {
  return (
    <Modal open={open} toggle={toggle}>
      <img
        src="https://res.cloudinary.com/dgarvanzw/image/upload/ngl_questions/message.png"
        alt="Upgrade"
        className="img-upgrade"
      />
      <p className="no-margin">
        <strong>See all NGL bot messages</strong>
      </p>
      <p className="no-margin">
        Check which messages are sent by bots in NGL app
      </p>
      <form
        action={`${apiURL()}/stripe/create-checkout-session/`}
        method="POST"
      >
        <Button // eslint-disable-next-line react/jsx-no-bind
          type="submit"
          label="🔓 Unlock"
          primary
        />
      </form>
      <p className="no-margin shadow-text">
        One payment, lifetime access, $1.99
      </p>
    </Modal>
  );
};

export default UpgradeModal;

UpgradeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
