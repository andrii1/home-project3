/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import getStripe from '../../lib/getStripe';
import './Apps.Style.css';
import { apiURL } from '../../apiURL';
import { Card } from '../../components/Card/Card.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BuyButton } from '../../components/BuyButton/BuyButton.Component';
import { Button } from '../../components/Button/Button.component';
import { Loading } from '../../components/Loading/Loading.Component';
import DropDownView from '../../components/CategoriesListDropDown/CategoriesListDropDown.component';
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '../../components/Modal/Modal.Component';
import { blurredQuestions } from '../../utils/blurredQuestions';
import { useUserContext } from '../../userContext';
import { handleStripeCheckout } from '../../utils/handleStripeCheckout';

import {
  faSearch,
  faFilter,
  faList,
  faGrip,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';

export const Apps = () => {
  const { user, customer } = useUserContext();
  const location = useLocation();
  const { topicIdParam, categoryIdParam } = useParams();
  const [searchTerms, setSearchTerms] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [resultsHome, setResultsHome] = useState([]);

  const [topics, setTopics] = useState([]);
  const [allRatings, setAllRatings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [filteredPricingPreview, setFilteredPricingPreview] = useState([]);
  const [filteredDetailsPreview, setFilteredDetailsPreview] = useState([]);
  const [filteredPricing, setFilteredPricing] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [filtersSubmitted, setFiltersSubmitted] = useState(false);
  const [showFiltersContainer, setShowFiltersContainer] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listView, setListView] = useState(true);
  const [page, setPage] = useState(0);
  const [counter, setCounter] = useState(0);
  const [apps, setApps] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderBy, setOrderBy] = useState({
    column: 'id',
    direction: 'desc',
  });
  const [pricingOptionsChecked, setPricingOptionsChecked] = useState([
    { title: 'Free', checked: false },
    { title: 'Paid with a free plan', checked: false },
    { title: 'Paid with a free trial', checked: false },
    { title: 'Paid', checked: false },
  ]);
  const [detailsOptionsChecked, setDetailsOptionsChecked] = useState([
    { title: 'Browser extension', checked: false },
    { title: 'iOS app available', checked: false },
    { title: 'Android app available', checked: false },
    { title: 'Social media contacts', checked: false },
  ]);

  const toggleModal = () => {
    setOpenModal(false);
    document.body.style.overflow = 'visible';
  };

  // first fetch
  useEffect(() => {
    setIsLoading(true);
    const url = `${apiURL()}/questions?page=0&column=${
      orderBy.column
    }&direction=${orderBy.direction}${
      topicIdParam !== undefined ? `&filteredTopics=${topicIdParam}` : ''
    }${
      categoryIdParam !== undefined
        ? `&filteredCategories=${categoryIdParam}`
        : ''
    }${
      filtersSubmitted && filteredPricing.length > 0
        ? `&filteredPricing=${encodeURIComponent(filteredPricing)}`
        : ''
    }${
      filtersSubmitted && filteredDetails.length > 0
        ? `&filteredDetails=${encodeURIComponent(filteredDetails)}`
        : ''
    }`;

    // if (topicIdParam) {
    //   url = `${apiURL()}/apps?page=0&filteredTopics=${topicIdParam}&column=${
    //     orderBy.column
    //   }&direction=${orderBy.direction}`;
    // } else if (categoryIdParam) {
    //   url = `${apiURL()}/apps?page=0&filteredCategories=${categoryIdParam}&column=${
    //     orderBy.column
    //   }&direction=${orderBy.direction}`;
    // } else {
    //   url = `${apiURL()}/apps?page=0&column=${orderBy.column}&direction=${
    //     orderBy.direction
    //   }`;
    // }
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();

      let hasMore = true;
      if (json.data.some((item) => item.id === json.lastItem.id)) {
        hasMore = false;
      }

      setApps({
        data: json.data,
        lastItem: json.lastItem,
        hasMore,
      });
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }

    fetchData();
  }, [
    categoryIdParam,
    topicIdParam,
    orderBy.column,
    orderBy.direction,
    filteredDetails,
    filteredPricing,
    filtersSubmitted,
  ]);

  const fetchApps = async () => {
    setIsLoading(true);
    setError(null);

    const url = `${apiURL()}/questions?page=${page}&column=${
      orderBy.column
    }&direction=${orderBy.direction}${
      topicIdParam !== undefined ? `&filteredTopics=${topicIdParam}` : ''
    }${
      categoryIdParam !== undefined
        ? `&filteredCategories=${categoryIdParam}`
        : ''
    }${
      filtersSubmitted && filteredPricing.length > 0
        ? `&filteredPricing=${encodeURIComponent(filteredPricing)}`
        : ''
    }${
      filtersSubmitted && filteredDetails.length > 0
        ? `&filteredDetails=${encodeURIComponent(filteredDetails)}`
        : ''
    }`;

    // let url;
    // if (topicIdParam) {
    //   url = `${apiURL()}/apps?filteredTopics=${topicIdParam}&page=${page}&column=${
    //     orderBy.column
    //   }&direction=${orderBy.direction}`;
    // } else if (categoryIdParam) {
    //   url = `${apiURL()}/apps?filteredCategories=${categoryIdParam}&page=${page}&column=${
    //     orderBy.column
    //   }&direction=${orderBy.direction}`;
    // } else {
    //   url = `${apiURL()}/apps?page=${page}&column=${orderBy.column}&direction=${
    //     orderBy.direction
    //   }`;
    // }

    const response = await fetch(url);
    const json = await response.json();

    // setApps({ data: json.data, totalCount: json.totalCount, hasMore });

    let hasMore = true;

    if (json.data.some((item) => item.id === json.lastItem.id)) {
      hasMore = false;
    }

    setApps((prevItems) => {
      return {
        data: [...prevItems.data, ...json.data],
        lastItem: json.lastItem,
        hasMore,
      };
    });

    setPage((prev) => prev + 1);
  };

  // const fetchApps = useCallback(async () => {
  //   try {
  //     await setLoading(true);
  //     await setError(false);
  //     console.log('pagetest', page);
  //     let url;
  //     if (topicIdParam) {
  //       url = `${apiURL()}/apps?filteredTopics=${topicIdParam}&page=${page}`;
  //     } else if (categoryIdParam) {
  //       url = `${apiURL()}/apps?filteredCategories=${categoryIdParam}&page=${page}`;
  //     } else {
  //       url = `${apiURL()}/apps?page=${page}`;
  //     }
  //     const response = await fetch(url);
  //     const appsResponse = await response.json();

  //     console.log('appsResponse', appsResponse);
  //     setApps(appsResponse);

  //     console.log('apps', apps);

  //     //  else {
  //     //   setApps((prevItems) => [...prevItems, ...appsResponse]);
  //     // }

  //     // setApps((prevItems) => [...prevItems, ...appsResponse]);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //   }
  // }, [page, categoryIdParam, topicIdParam]);

  // useEffect(() => {
  //   fetchApps();
  // }, [fetchApps]);

  // useEffect(() => {
  //   setApps([]);
  // }, [location]);

  const setupUrlFilters = useCallback(async () => {
    let urlFilters = '';
    if (filteredTopics.length > 0) {
      urlFilters = `?filteredTopics=${filteredTopics}`;
    }
    return urlFilters;
  }, [filteredTopics]);
  useEffect(() => {
    async function fetchAppsSearch() {
      const responseApps = await fetch(`${apiURL()}/questions/`);

      const responseAppsJson = await responseApps.json();

      if (searchTerms) {
        const filteredSearch = responseAppsJson.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setResultsHome(filteredSearch);
      }
    }
    fetchAppsSearch();
  }, [searchTerms]);

  // const fetchApps = useCallback(async () => {
  //   // const urlFilters = await setupUrlFilters();
  //   let url;
  //   if (topicIdParam) {
  //     url = `${apiURL()}/apps/?filteredTopics=${topicIdParam}&page=${page}`;
  //   } else if (categoryIdParam) {
  //     url = `${apiURL()}/apps/?filteredCategories=${categoryIdParam}&page=${page}`;
  //   } else {
  //     url = `${apiURL()}/apps/?page=${page}`;
  //   }

  //   const response = await fetch(url);
  //   const appsResponse = await response.json();
  //   setApps((prevItems) => [...prevItems, ...appsResponse]);

  //   // setApps(appsResponse);

  //   // const promptsExportReady = promptsResponse.dataExport.map((prompt) => {
  //   //   return {
  //   //     id: prompt.id,
  //   //     prompt: prompt.title,
  //   //     category: prompt.categoryTitle,
  //   //     topic: prompt.topicTitle,
  //   //   };
  //   // });
  //   // setPromptsExport(promptsExportReady);
  //   setIsLoading(false);
  // }, [topicIdParam, categoryIdParam, page]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchApps();
  // }, [fetchApps]);

  useEffect(() => {
    setPage(0);
  }, [location]);

  useEffect(() => {
    setPage(0);
  }, [sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [filteredPricing]);

  useEffect(() => {
    setPage(0);
  }, [filteredDetails]);

  // useEffect(() => {
  //   setCounter((prev) => prev + 1);
  // }, []);
  // console.log('counter', counter);

  // const handleObserver = useCallback((entries) => {
  //   const target = entries[0];

  //   console.log('test12');
  //   if (entries.length > 1) return;
  //   if (target.isIntersecting) {
  //     setPage((prev) => prev + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: '20px',
  //     threshold: 0,
  //   };
  //   const observer = new IntersectionObserver(handleObserver, option);
  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }
  // }, [handleObserver]);

  useEffect(() => {
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);
    }

    // async function fetchCategories() {
    //   const response = await fetch(`${apiURL()}/categories/`);
    //   const categoriesResponse = await response.json();
    //   setCategories(categoriesResponse);
    // }

    // fetchApps();
    fetchTopics();
    // fetchCategories();
  }, []);

  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const filterHandlerPricing = (event) => {
    if (event.target.checked) {
      setFilteredPricingPreview([
        ...filteredPricingPreview,
        event.target.value,
      ]);

      const newItems = pricingOptionsChecked.map((item) => {
        if (item.title === event.target.value) {
          return { ...item, checked: true };
        }
        return item;
      });
      setPricingOptionsChecked(newItems);
    } else {
      setFilteredPricingPreview(
        filteredPricingPreview.filter(
          (filterTopic) => filterTopic !== event.target.value,
        ),
      );
      const newItems = pricingOptionsChecked.map((item) => {
        if (item.title === event.target.value) {
          return { ...item, checked: false };
        }
        return item;
      });
      setPricingOptionsChecked(newItems);
    }
  };

  const filterHandlerDetails = (event) => {
    if (event.target.checked) {
      setFilteredDetailsPreview([
        ...filteredDetailsPreview,
        event.target.value,
      ]);
      const newItems = detailsOptionsChecked.map((item) => {
        if (item.title === event.target.value) {
          return { ...item, checked: true };
        }
        return item;
      });
      setDetailsOptionsChecked(newItems);
    } else {
      setFilteredDetailsPreview(
        filteredDetailsPreview.filter(
          (filterTopic) => filterTopic !== event.target.value,
        ),
      );
      const newItems = detailsOptionsChecked.map((item) => {
        if (item.title === event.target.value) {
          return { ...item, checked: false };
        }
        return item;
      });
      setDetailsOptionsChecked(newItems);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFiltersSubmitted(true);
    setFilteredPricing(filteredPricingPreview);
    setFilteredDetails(filteredDetailsPreview);
  };

  const clearFiltersHandler = (event) => {
    const newItemsDetails = detailsOptionsChecked.map((item) => {
      return { ...item, checked: false };
    });
    setDetailsOptionsChecked(newItemsDetails);

    const newItemsPricing = pricingOptionsChecked.map((item) => {
      return { ...item, checked: false };
    });
    setPricingOptionsChecked(newItemsPricing);
    setFilteredDetails([]);
    setFilteredPricing([]);
  };

  const dropdownList = resultsHome.map((app) => {
    if (!customer && app.topic_id === 1) {
      return (
        <div key={app.id}>
          <li>
            <span className="blurred">
              {
                blurredQuestions[
                  Math.floor(Math.random() * blurredQuestions.length)
                ]
              }
            </span>
            {user ? (
              <Button // eslint-disable-next-line react/jsx-no-bind
                onClick={() => handleStripeCheckout(user?.email)}
                label="🔒 bot message... Upgrade"
                size="small"
                primary
              />
            ) : (
              <Link key={app.id} to="/signup">
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
      <Link key={app.id} to={`/questions/${app.id}`}>
        <li>{app.title}</li>
      </Link>
    );
  });

  const topicsList = topics.map((topic) => {
    if (topicIdParam) {
      return (
        <Link to={`/questions/topic/${topic.id}`}>
          <Button
            backgroundColor={
              topic.id.toString() === topicIdParam.toString()
                ? 'rgb(255, 229, 217)'
                : 'white'
            }
            // primary={topic.id.toString() === topicIdParam.toString() && true}
            // secondary={topic.id !== topicIdParam && true}
            secondary
            label={topic.title}
          />
        </Link>
      );
    }
    if (categoryIdParam) {
      return (
        <Link to={`/questions/topic/${topic.id}`}>
          <Button secondary label={topic.title} />
        </Link>
      );
    }
    return (
      <Link to={`/questions/topic/${topic.id}`}>
        <Button secondary label={topic.title} />
      </Link>
    );
  });

  useEffect(() => {
    let column;
    let direction;
    if (sortOrder === 'A-Z') {
      column = 'title';
      direction = 'asc';
    } else if (sortOrder === 'Z-A') {
      column = 'title';
      direction = 'desc';
    } else {
      column = 'id';
      direction = 'desc';
    }

    setOrderBy({ column, direction });
  }, [sortOrder]);

  let pageTitle;
  if (topicIdParam) {
    pageTitle = `${topics
      .filter((topic) => topic.id === parseInt(topicIdParam, 10))
      .map((item) => item.title)} - NGL questions`;
  } else if (categoryIdParam) {
    pageTitle = `${categories
      .filter((category) => category.id === parseInt(categoryIdParam, 10))
      .map((item) => item.title)} - NGL questions`;
  } else {
    pageTitle =
      'NGL BOT questions - browse ngl bot messages, other questions to ask on ngl';
  }

  const sortOptions = ['Recent', 'A-Z', 'Z-A'];

  const pricingList = pricingOptionsChecked.map((item) => (
    <li key={item}>
      <input
        checked={item.checked}
        type="checkbox"
        value={item.title}
        onChange={filterHandlerPricing}
      />{' '}
      {item.title}
    </li>
  ));

  const detailsList = detailsOptionsChecked.map((item) => (
    <li key={item}>
      <input
        checked={item.checked}
        type="checkbox"
        value={item.title}
        onChange={filterHandlerDetails}
      />{' '}
      {item.title}
    </li>
  ));
  const fetchFavorites = useCallback(async () => {
    const url = `${apiURL()}/favorites`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const favoritesData = await response.json();

    if (Array.isArray(favoritesData)) {
      setFavorites(favoritesData);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (appId) => {
    const response = await fetch(`${apiURL()}/favorites`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: appId,
      }),
    });

    if (response.ok) {
      fetchFavorites();
    }
  };

  const handleDeleteBookmarks = (favoritesId) => {
    const deleteFavorites = async () => {
      const response = await fetch(`${apiURL()}/favorites/${favoritesId} `, {
        method: 'DELETE',
        headers: {
          token: `token ${user?.uid}`,
        },
      });

      if (response.ok) {
        fetchFavorites();
      }
    };

    deleteFavorites();
  };

  const fetchAllRatings = useCallback(async () => {
    const url = `${apiURL()}/ratings`;
    const response = await fetch(url);
    const ratingsData = await response.json();
    setAllRatings(ratingsData);
  }, []);

  useEffect(() => {
    fetchAllRatings();
  }, [fetchAllRatings]);

  const fetchRatings = useCallback(async () => {
    const url = `${apiURL()}/ratings`;
    const response = await fetch(url, {
      headers: {
        token: `token ${user?.uid}`,
      },
    });
    const ratingsData = await response.json();

    if (Array.isArray(ratingsData)) {
      setRatings(ratingsData);
    } else {
      setRatings([]);
    }
  }, [user]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const addRating = async (appId) => {
    const response = await fetch(`${apiURL()}/ratings`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: appId,
      }),
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  const deleteRating = async (appId) => {
    const response = await fetch(`${apiURL()}/ratings/${appId}`, {
      method: 'DELETE',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      fetchRatings();
      fetchAllRatings();
    }
  };

  // async function handleStripeCheckout() {
  //   const stripe = await getStripe();
  //   const { error1 } = await stripe.redirectToCheckout({
  //     lineItems: [
  //       {
  //         price: `${process.env.REACT_APP_PUBLIC_STRIPE_PRICE_ID}`,
  //         quantity: 1,
  //       },
  //     ],
  //     mode: 'payment',
  //     successUrl: `http://localhost:3000/success`,
  //     cancelUrl: `http://localhost:3000/cancel`,
  //     customerEmail: user?.email,
  //   });
  // }

  return (
    <main>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Find best NGL questions for free" />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero">
        <h1 className="hero-header">Browse NGL bot questions</h1>
        <form className="home">
          <label>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              type="text"
              className="input-search-home"
              onChange={handleSearch}
              /* onFocus={handleClick} */
              placeholder="Search NGL bot questions..."
            />
          </label>
        </form>
        {searchTerms ? (
          <div className="dropdown-search">
            <ul>
              {resultsHome.length > 0 ? (
                dropdownList
              ) : (
                <span className="search-no-apps">
                  No NGL questions found :(
                </span>
              )}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
      {topics.length > 0 && (
        <section className="container-topics">
          <Link to="/">
            <Button
              backgroundColor={!topicIdParam ? 'rgb(255, 229, 217)' : 'white'}
              // primary={!topicIdParam && true}
              // secondary={topicIdParam && true}
              secondary
              label="All NGL questions"
            />
          </Link>
          {topicsList}
        </section>
      )}
      <section className="container-filters">
        <DropDownView
          label="Sort"
          options={sortOptions}
          onSelect={(option) => setSortOrder(option)}
          showFilterIcon={false}
        />

        {/* <Button
          secondary
          onClick={(event) => setShowFiltersContainer(!showFiltersContainer)}
          backgroundColor="#ffe5d9"
          label="Filters"
          icon={<FontAwesomeIcon className="filter-icon" icon={faFilter} />}
        /> */}
        <Button
          secondary
          onClick={() => setListView(!listView)}
          backgroundColor="#ffe5d9"
        >
          <div className="filter-grid">
            <FontAwesomeIcon size="lg" icon={faGrip} />
            <FontAwesomeIcon icon={faList} />
          </div>
        </Button>
      </section>
      <section
        className={`container-details-section ${
          showFiltersContainer && 'show'
        }`}
      >
        <div className="container-details filters">
          <form onSubmit={submitHandler}>
            <div className="container-form">
              <div>
                <h3>Pricing</h3>
                <ul>{pricingList}</ul>
              </div>
              <div>
                <h3>Details</h3>
                <ul>{detailsList}</ul>
              </div>
            </div>
            <div className="container-buttons">
              <Button type="submit" primary label="Apply filters" />
              <Button
                type="button"
                onClick={clearFiltersHandler}
                secondary
                label="Clear"
              />
            </div>
          </form>
        </div>
      </section>
      {topicIdParam === '1' && !user ? (
        <div className="container-details upgrade">
          <div>
            <h2>🔥 Create an account and upgrade</h2>
            <p>
              To browse and search <strong>NGL bot messages</strong>
            </p>
          </div>
          <div>
            <Link to="/signup">
              <Button primary label="Create an account or log in 👌" />
            </Link>
          </div>
        </div>
      ) : topicIdParam === '1' && user && !customer ? (
        <div className="container-details upgrade">
          <div>
            <h2>🔥 You need to upgrade</h2>
            <p>
              To browse and search <strong>NGL bot messages</strong>
            </p>
          </div>
          <div>
            <Button
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => handleStripeCheckout(user?.email)}
              primary
              label="$6.99 (one-time payment) 👌"
            />
          </div>
        </div>
      ) : apps.data ? (
        <section className="container-scroll">
          <InfiniteScroll
            dataLength={apps.data.length}
            next={fetchApps}
            hasMore={apps.hasMore} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
            className={`container-cards ${listView ? 'list' : 'grid'}`}
          >
            {apps.data.map((app) => {
              return (
                <Card
                  listCard={listView}
                  id={app.id}
                  title={app.title}
                  description={app.description}
                  url={app.url}
                  urlImage="message"
                  topic={app.topicTitle}
                  topicId={app.topic_id}
                  pricingType={app.pricing_type}
                  isFavorite={
                    allRatings.some(
                      (rating) => rating.question_id === app.id,
                    ) && ratings.some((rating) => rating.id === app.id)
                  }
                  numberOfRatings={
                    allRatings.filter((rating) => rating.question_id === app.id)
                      .length
                  }
                  addRating={(event) => addRating(app.id)}
                  deleteRating={() => deleteRating(app.id)}
                  ratingOnClick={() => {
                    setOpenModal(true);
                    setModalTitle('Sign up to like');
                  }}
                  buttonOnClick={() => handleStripeCheckout(user?.email)}
                />
              );
            })}
          </InfiniteScroll>
        </section>
      ) : (
        <Loading />
      )}
      <Modal title={modalTitle} open={openModal} toggle={toggleModal}>
        <Link to="/signup">
          <Button primary label="Create an account" />
        </Link>
        or
        <Link to="/login">
          <Button secondary label="Log in" />
        </Link>
      </Modal>
    </main>
  );
};
