/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { apiURL } from '../../apiURL';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import { Badge } from '../Badge/Badge.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import appImage from '../../assets/images/app-placeholder.svg';
// import appImage from '../../../public/assets/images/small-screenshot.png';
import { useUserContext } from '../../userContext';
import { blurredQuestions } from '../../utils/blurredQuestions';
import { stringToHash } from '../../utils/stringToHash';

import './Card.styles.css';

export const Card = ({
  title,
  description,
  topic,
  topicId,
  pricingType,
  url,
  urlImage,
  id,
  className,
  smallCard = true,
  listCard = false,
  isFavorite,
  addRating,
  deleteRating,
  ratingOnClick,
  botQuestionOnClick,
  buttonOnClick,
  numberOfRatings,
}) => {
  const { user, customer } = useUserContext();

  if (smallCard) {
    return (
      <Link
        className="card-category--small card-image--small"
        style={{
          backgroundImage: `url(http://res.cloudinary.com/dgarvanzw/image/upload/w_500,q_auto,f_auto/apps_ai/${urlImage}.png )`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="card-header">
          <Link to={`/questions/${id}`} target="_blank">
            <h2>{title}</h2>
          </Link>
        </div>
        <div className="topics-bookmark--small">
          <Badge secondary label={topic} size="small" />
          {/* <Badge label={pricingType} size="small" /> */}
        </div>
      </Link>
    );
  }
  if (!customer && topicId === 1) {
    return (
      <div className={listCard ? 'card-list' : 'card-category'}>
        <div
          className={`card-image ${listCard ? 'list' : ''}`}
          style={{
            backgroundImage: `url(http://res.cloudinary.com/dgarvanzw/image/upload/ngl_questions/${urlImage}.png )`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${listCard ? '80px' : '100px'}`,
          }}
        />
        <div className={`card-body ${listCard ? 'list' : ''}`}>
          <div className="card-header">
            <div className="card-title">
              <div className="container-blurred">
                <h2 className={`${listCard ? 'list-card' : ''} blur`}>
                  {stringToHash(title)}
                  {/* {
                    blurredQuestions[
                      Math.floor(Math.random() * blurredQuestions.length)
                    ]
                  } */}
                </h2>
                <Button // eslint-disable-next-line react/jsx-no-bind
                  type="submit"
                  label="🔓 Unlock bot questions"
                  size="small"
                  primary
                  onClick={botQuestionOnClick}
                  className="form-absolute"
                />
                {/* {user ? (
                  <form
                    action={`${apiURL()}/stripe/create-checkout-session/`}
                    method="POST"
                    className="form-absolute"
                  >
                    <Button // eslint-disable-next-line react/jsx-no-bind
                      type="submit"
                      label="See bot questions 👀"
                      size="small"
                      primary
                    />
                  </form>
                ) : (
                  <form
                    action={`${apiURL()}/stripe/create-checkout-session/`}
                    method="POST"
                    className="form-absolute"
                  >
                    <Button // eslint-disable-next-line react/jsx-no-bind
                      type="submit"
                      label="See bot questions 👀"
                      size="small"
                      primary
                    />
                  </form>
                  // <Link key={id} to="/signup" className="absolute">
                  //   <Button // eslint-disable-next-line react/jsx-no-bind
                  //     label="🔒 Sign up & upgrade"
                  //     size="small"
                  //     primary
                  //   />
                  // </Link>
                )} */}
              </div>
            </div>
            {/* <Badge label={pricingType} size="small" /> */}
          </div>
          {description && (
            <div className="card-description">
              {`${description.split(' ').slice(0, 15).join(' ')}...`}
            </div>
          )}
          <div className="topics-bookmark">
            <Link to={`/questions/topic/${topicId}`}>
              <Button
                secondary
                backgroundColor="rgb(255, 229, 217)"
                label={topic}
                size="small"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={listCard ? 'card-list' : 'card-category'}>
      <Link
        to={`/questions/${id}`}
        target="_blank"
        className={`card-image ${listCard ? 'list' : ''}`}
        style={{
          backgroundImage: `url(http://res.cloudinary.com/dgarvanzw/image/upload/ngl_questions/${urlImage}.png )`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${listCard ? '80px' : '100px'}`,
        }}
      />
      <div className={`card-body ${listCard ? 'list' : ''}`}>
        <div className="card-header">
          <div className="card-title">
            <Link to={`/questions/${id}`} target="_blank">
              <h2 className={`${listCard ? 'list-card' : ''}`}>{title}</h2>
            </Link>
            <Link to={`/apps/${id}`} target="_blank">
              <FontAwesomeIcon
                className="icon-card"
                icon={faArrowUpRightFromSquare}
                style={{ color: '#000' }}
                size="lg"
              />
            </Link>
          </div>
          {/* <Badge label={pricingType} size="small" /> */}
        </div>
        {description && (
          <div className="card-description">
            {`${description.split(' ').slice(0, 15).join(' ')}...`}
          </div>
        )}
        <div className="topics-bookmark">
          <Link to={`/questions/topic/${topicId}`}>
            <Button
              secondary
              backgroundColor="rgb(255, 229, 217)"
              label={topic}
              size="small"
            />
          </Link>

          {user && isFavorite ? (
            <div className="container-rating" onClick={deleteRating}>
              <FontAwesomeIcon size="xl" icon={faHeartSolid} />
              {numberOfRatings}
            </div>
          ) : user ? (
            <div className="container-rating" onClick={addRating}>
              <FontAwesomeIcon size="xl" icon={faHeart} />
              {numberOfRatings}
            </div>
          ) : (
            <div className="container-rating" onClick={ratingOnClick}>
              <FontAwesomeIcon size="xl" icon={faHeart} />
              {numberOfRatings}
            </div>
          )}

          {/* {user && isFavorite ? (
            <button
              type="button"
              onClick={deleteBookmark}
              onKeyDown={deleteBookmark}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeartSolid} size="lg" />
            </button>
          ) : user ? (
            <button
              type="button"
              onClick={addFavorite}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          ) : (
            <button
              type="button"
              onClick={bookmarkOnClick}
              onKeyDown={addFavorite}
              className="button-bookmark"
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="card-list">
  //       <Link
  //         to={`/apps/${id}`}
  //         target="_blank"
  //         className="card-image list"
  //         style={{
  //           backgroundImage: `url(/assets/images/finalscout-sm.png)`,
  //           backgroundRepeat: 'no-repeat',
  //           backgroundSize: 'cover',
  //         }}
  //       />
  //       <div className="card-body list">
  //         <div className="card-header">
  //           <div className="card-title">
  //             <Link to={`/apps/${id}`} target="_blank">
  //               <h2>{title}</h2>
  //             </Link>
  //             <Link to={`/apps/${id}`} target="_blank">
  //               <FontAwesomeIcon
  //                 className="icon-card"
  //                 icon={faArrowUpRightFromSquare}
  //                 style={{ color: '#e5989b' }}
  //                 size="lg"
  //               />
  //             </Link>
  //           </div>
  //           <Badge label={pricingType} size="small" />
  //         </div>
  //         <div className="card-description">
  //           {`${description.split(' ').slice(0, 35).join(' ')}...`}
  //         </div>
  //         <div className="topics-bookmark">
  //           <Link to={`/apps/topic/${topicId}`}>
  //             <Button label={topic} size="small" />
  //           </Link>
  //           <FontAwesomeIcon icon={faHeart} size="lg" />
  //         </div>
  //       </div>
  //     </div>
  //   );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  topic: PropTypes.string,
  topicId: PropTypes.string,
  pricingType: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.shape,
  urlImage: PropTypes.string,
  smallCard: PropTypes.bool,
  listCard: PropTypes.bool,
  className: PropTypes.string,
  isFavorite: PropTypes.func,
  addRating: PropTypes.func,
  deleteRating: PropTypes.func,
  ratingOnClick: PropTypes.func,
  botQuestionOnClick: PropTypes.func,
  buttonOnClick: PropTypes.func,
  numberOfRatings: PropTypes.string,
};

Card.defaultProps = {
  title: null,
  description: null,
  pricingType: null,
  topicId: null,
  topic: null,
  url: null,
  urlImage: null,
  id: null,
  numberOfRatings: null,
  smallCard: false,
  listCard: false,
  className: null,
  isFavorite: undefined,
  addRating: undefined,
  deleteRating: undefined,
  ratingOnClick: undefined,
  botQuestionOnClick: undefined,
  buttonOnClick: undefined,
};
