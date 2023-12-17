/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
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
  addFavorite,
  deleteBookmark,
  bookmarkOnClick,
  buttonOnClick,
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
                  {
                    blurredQuestions[
                      Math.floor(Math.random() * blurredQuestions.length)
                    ]
                  }
                </h2>
                {user ? (
                  <Button // eslint-disable-next-line react/jsx-no-bind
                    onClick={buttonOnClick}
                    label="See bot questions 👀"
                    size="small"
                    primary
                    className="absolute"
                  />
                ) : (
                  <Link key={id} to="/signup" className="absolute">
                    <Button // eslint-disable-next-line react/jsx-no-bind
                      label="🔒 Sign up & upgrade"
                      size="small"
                      primary
                    />
                  </Link>
                )}
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

            {user &&
            allRatings.some((rating) => rating.question_id === app.id) &&
            ratings.some((rating) => rating.id === app.id) ? (
              <div
                className="container-rating"
                onClick={(event) => deleteRating(app.id)}
              >
                <FontAwesomeIcon size="xl" icon={faHeartSolid} />
                {
                  allRatings.filter((rating) => rating.question_id === app.id)
                    .length
                }
              </div>
            ) : user ? (
              <div
                className="container-rating"
                onClick={(event) => addRating(app.id)}
              >
                <FontAwesomeIcon size="xl" icon={faHeart} />

                {
                  allRatings.filter((rating) => rating.question_id === app.id)
                    .length
                }
              </div>
            ) : (
              <div
                className="container-rating"
                onClick={() => {
                  setOpenModal(true);
                  setModalTitle('Sign up add likes');
                }}
              >
                <FontAwesomeIcon size="xl" icon={faHeart} />
                {
                  allRatings.filter((rating) => rating.question_id === app.id)
                    .length
                }
              </div>
            )}
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

          {user &&
          allRatings.some((rating) => rating.question_id === app.id) &&
          ratings.some((rating) => rating.id === app.id) ? (
            <div
              className="container-rating"
              onClick={(event) => deleteRating(app.id)}
            >
              <FontAwesomeIcon size="xl" icon={faHeartSolid} />
              {
                allRatings.filter((rating) => rating.question_id === app.id)
                  .length
              }
            </div>
          ) : user ? (
            <div
              className="container-rating"
              onClick={(event) => addRating(app.id)}
            >
              <FontAwesomeIcon size="xl" icon={faHeart} />

              {
                allRatings.filter((rating) => rating.question_id === app.id)
                  .length
              }
            </div>
          ) : (
            <div
              className="container-rating"
              onClick={() => {
                setOpenModal(true);
                setModalTitle('Sign up add likes');
              }}
            >
              <FontAwesomeIcon size="xl" icon={faHeart} />
              {
                allRatings.filter((rating) => rating.question_id === app.id)
                  .length
              }
            </div>
          )}
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
  addFavorite: PropTypes.func,
  deleteBookmark: PropTypes.func,
  bookmarkOnClick: PropTypes.func,
  buttonOnClick: PropTypes.func,
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
  smallCard: false,
  listCard: false,
  className: null,
  isFavorite: undefined,
  addFavorite: undefined,
  deleteBookmark: undefined,
  bookmarkOnClick: undefined,
  buttonOnClick: undefined,
};
