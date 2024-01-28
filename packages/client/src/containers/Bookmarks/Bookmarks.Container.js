import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Helmet } from 'react-helmet';
import './Bookmarks.Style.css';
import { apiURL } from '../../apiURL';
import { TableRow } from '../../components/TableRow/TableRow.Component';

export const Bookmarks = () => {
  const { user, loading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  // const fetchFavorites = useCallback(async () => {
  //   setIsLoading(true);
  //   const url = `${apiURL()}/favorites`;
  //   const response = await fetch(url, {
  //     headers: {
  //       token: `token ${user?.uid}`,
  //     },
  //   });
  //   const favoritesData = await response.json();

  //   if (Array.isArray(favoritesData)) {
  //     setFavorites(favoritesData);
  //   } else {
  //     setFavorites([]);
  //   }
  //   setIsLoading(false);
  // }, [user]);

  // useEffect(() => {
  //   fetchFavorites();
  // }, [fetchFavorites]);

  // const handleDeleteBookmarks = (favoritesId, id) => {
  //   const deleteFavorites = async () => {
  //     const response = await fetch(`${apiURL()}/favorites/${favoritesId} `, {
  //       method: 'DELETE',
  //       headers: {
  //         token: `token ${user?.uid}`,
  //       },
  //     });

  //     if (response.ok) {
  //       fetchFavorites();
  //     }
  //   };

  //   deleteFavorites();
  // };

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
    }
  };
  const favoritesList = ratings.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <TableRow
        id={prompt.id}
        title={prompt.title}
        category={prompt.category}
        topic={prompt.topic}
        deleteBookmark={() => deleteRating(prompt.id)}
      />
    </div>
  ));
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);
  return (
    <>
      <Helmet>
        <title>Bookmarks</title>
      </Helmet>
      <main>
        <h1 className="hero-title">Bookmarks</h1>
        {favoritesList}
      </main>
    </>
  );
};
