import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Topics.Style.css';
import { apiURL } from '../../apiURL';
import { CardCategories } from '../../components/CardCategories/CardCategories.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/Button/Button.component';

export const Topics = () => {
  const [searchTerms, setSearchTerms] = useState();
  const [resultsHome, setResultsHome] = useState([]);

  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      const responseTopics = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await responseTopics.json();

      if (searchTerms) {
        const filteredSearch = topicsResponse.filter((item) =>
          item.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );
        setResultsHome(filteredSearch);
      } else {
        setResultsHome(topicsResponse);
      }
    }
    fetchCategories();
  }, [searchTerms]);

  useEffect(() => {
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      setTopics(topicsResponse);
    }

    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    setSearchTerms(event.target.value);
  };

  const dropdownList = resultsHome.map((result) => {
    return (
      <Link to={`/questions/topic/${result.id}`}>
        <li key={result.id}>{result.title}</li>
      </Link>
    );
  });
  const cardItems = topics.map((topic) => {
    // const relatedTopics = topics
    //   .filter((topic) => topic.categoryId === category.id)
    //   .map((item) => item.id);
    return (
      <Link to={`/questions/topic/${topic.id}`}>
        <Button secondary label={topic.title} />
      </Link>
    );
  });
  return (
    <main>
      <Helmet>
        <title>Apps with AI - discover best AI apps</title>
        <meta
          name="description"
          content="Find best Chat GPT prompts for free"
        />
      </Helmet>
      {/* <div className="hero"></div> */}
      <div className="hero">
        <h1 className="hero-header">Topics</h1>
        <p className="subheading">Find best NGL messages by topics</p>
      </div>
      <section className="topics-div center">{cardItems}</section>
    </main>
  );
};
