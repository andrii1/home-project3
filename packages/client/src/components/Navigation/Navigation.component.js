import React, { useState, useEffect } from 'react';
import './Navigation.Style.css';
import { apiURL } from '../../apiURL';
import { NavLink, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../Button/Button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/images/logo.png';
import { blurredQuestions } from '../../utils/blurredQuestions';
import { handleStripeCheckout } from '../../utils/handleStripeCheckout';
import {
  faUser,
  faRightFromBracket,
  faSearch,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal.Component';

export const Navigation = () => {
  const { user, customer, name, logout } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [hamburgerUserOpen, setHamburgerUserOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);
  const [resultsHomeApps, setResultsHomeApps] = useState([]);
  const [topics, setTopics] = useState([]);
  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };
  const toggleSearchModal = () => {
    setOpenSearchModal(false);
    document.body.style.overflow = 'visible';
  };
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const toggleHamburgerUser = () => {
    setHamburgerUserOpen(!hamburgerUserOpen);
  };

  useEffect(() => {
    // Applying on mount
    if (hamburgerOpen || hamburgerUserOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [hamburgerOpen, hamburgerUserOpen]);

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchModal((modal) => !modal);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const responseTopics = await fetch(`${apiURL()}/topics/`);

      const topicsResponse = await responseTopics.json();
      setTopics(topicsResponse);

      if (searchTerms) {
        const filteredSearch = topicsResponse.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setResultsHome(filteredSearch);
      } else {
        setResultsHome(topicsResponse);
      }
    }

    async function fetchApps() {
      const responseApps = await fetch(`${apiURL()}/questions/`);

      const responseAppsJson = await responseApps.json();
      if (searchTerms) {
        const filteredSearch = responseAppsJson.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setResultsHomeApps(filteredSearch);
      }
    }

    fetchCategories();
    fetchApps();
  }, [searchTerms]);
  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const dropDownResultsTopics = resultsHome.map((result) => {
    let finalResult;
    if (Object.keys(result).length > 2) {
      finalResult = (
        <Link
          to={`/apps/topic/${result.id}`}
          /* state={{ frontPageItem: [result.id] }} */
          onClick={() => toggleSearchModal()}
        >
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    } else {
      finalResult = (
        <Link
          to={`/apps/category/${result.id}`}
          /* state={{ frontPageItem: relatedTopics }} */
          onClick={() => toggleSearchModal()}
        >
          <li key={result.id}>{result.title}</li>
        </Link>
      );
    }
    return finalResult;
  });
  const dropDownResultsApps = resultsHomeApps.map((result) => {
    if (!customer && result.topic_id === 1) {
      return (
        <div key={result.id}>
          <li>
            {/* <span className="blurred">
            {
              blurredQuestions[
                Math.floor(Math.random() * blurredQuestions.length)
              ]
            }
          </span> */}
            {user ? (
              <Button // eslint-disable-next-line react/jsx-no-bind
                label="🔒 bot message... Upgrade"
                size="small"
                primary
              />
            ) : (
              <Link key={result.id} to="/signup">
                <Button // eslint-disable-next-line react/jsx-no-bind
                  label="🔒 bot message... Sign up & upgrade"
                  size="small"
                  primary
                />
              </Link>
            )}
          </li>
        </div>
      );
    }
    return (
      <Link
        to={`/questions/${result.id}`}
        /* state={{ frontPageItem: relatedTopics }} */
        onClick={() => toggleSearchModal()}
      >
        <li key={result.id}>{result.title}</li>
      </Link>
    );
  });
  return (
    <>
      {/* mobile navigation */}
      <div className="navigation-mobile">
        <div className="menu">
          <ul>
            <li>
              <Button
                secondary
                className="hamburger-menu-button"
                onClick={toggleHamburger}
              >
                <FontAwesomeIcon icon={hamburgerOpen ? faXmark : faBars} />
              </Button>
              <ul
                className={`hamburger-menu ${
                  hamburgerOpen ? 'menu-open' : 'menu-closed'
                }`}
              >
                <li>
                  <NavLink to="/categories" className="nav-link">
                    Categories
                  </NavLink>
                </li>
                <li>
                  {user ? (
                    <NavLink to="/apps/new" className="login submit">
                      Submit
                    </NavLink>
                  ) : (
                    <NavLink
                      onClick={() => {
                        setOpenModal(true);
                        setModalTitle('Do you want to add your prompts?');
                      }}
                      className="login submit"
                    >
                      Submit an app
                    </NavLink>
                  )}
                </li>
              </ul>
            </li>
            {/* <li>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
            </li> */}
            <li>
              <NavLink to="/" className="nav-link">
                <img src={logo} alt="logo" className="img-logo" />
              </NavLink>
            </li>
            <li>
              {user ? (
                <div className="container-logged-in">
                  <Button
                    className="hamburger-menu-button"
                    onClick={toggleHamburgerUser}
                    primary
                  >
                    <FontAwesomeIcon
                      icon={hamburgerUserOpen ? faXmark : faUser}
                    />
                  </Button>
                  <div
                    className={`menu-user ${
                      hamburgerUserOpen ? 'menu-open' : 'menu-closed'
                    }`}
                  >
                    {name}
                    <NavLink to="/bookmarks" className="login">
                      Bookmarks
                    </NavLink>
                    <FontAwesomeIcon
                      onClick={logout}
                      className="share-icon"
                      icon={faRightFromBracket}
                    />
                  </div>
                </div>
              ) : (
                <div className="container-logged-out">
                  <NavLink to="/login" className="login">
                    Log in
                  </NavLink>
                  <Link to="/signup" className="signup">
                    <Button primary label="Sign up" />
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* desktop navigation */}
      <div className="navigation">
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                <img src={logo} alt="logo" className="img-logo" />
              </NavLink>
            </li>
            <li>
              <form>
                <label>
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input
                    type="text"
                    className="input-search-navigation"
                    onFocus={() => setOpenSearchModal((modal) => !modal)}
                    placeholder="Search ( ⌘ + k )"
                  />
                </label>
              </form>
            </li>
            <li>
              <NavLink to="/topics" className="nav-link">
                Topics
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-buttons">
          <ul>
            <li>
              {user && !customer ? (
                <Button
                  onClick={() => handleStripeCheckout(user?.email)}
                  primary
                  label="Unlock NGL bot messages 👀"
                />
              ) : (
                ''
              )}
            </li>
            <li>
              {user ? (
                <NavLink to="/questions/new" className="login submit">
                  Submit a question
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => {
                    setOpenModal(true);
                    setModalTitle('Do you want to add your prompts?');
                  }}
                  className="login submit"
                >
                  Submit a question
                </NavLink>
              )}
            </li>
            {user ? (
              <div className="container-logged-in">
                <NavLink to="/bookmarks" className="login">
                  Bookmarks
                </NavLink>
                {name}
                <Link to="/">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <FontAwesomeIcon
                  onClick={logout}
                  className="share-icon"
                  icon={faRightFromBracket}
                />
              </div>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="login">
                    Log in
                  </NavLink>
                </li>
                <li>
                  <Link to="/signup" className="signup">
                    <Button primary label="Sign up" />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Modal title={modalTitle} open={openModal} toggle={toggleModal}>
        <Link to="/signup">
          <Button primary label="Create an account" />
        </Link>
        or
        <Link to="/login">
          <Button label="Log in" />
        </Link>
      </Modal>
      <Modal
        open={openSearchModal}
        toggle={toggleSearchModal}
        overlayClass="overlay-navigation"
      >
        <form>
          <label>
            <FontAwesomeIcon className="search-icon-modal" icon={faSearch} />
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              type="text"
              className="input-search-modal"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="Search"
            />
          </label>
        </form>
        {searchTerms ? (
          <div className="dropdown-search-modal">
            <h3>NGL questions</h3>
            <ul>
              {dropDownResultsApps.length > 0 ? (
                dropDownResultsApps
              ) : (
                <li>No NGL questions found :(</li>
              )}
            </ul>
          </div>
        ) : (
          ''
        )}
      </Modal>
    </>
  );
};
