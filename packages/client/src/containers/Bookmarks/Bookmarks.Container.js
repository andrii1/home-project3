import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Helmet } from 'react-helmet';
import './Bookmarks.Style.css';
import { apiURL } from '../../apiURL';
import { TableRow } from '../../components/TableRow/TableRow.Component';
import Toast from '../../components/Toast/Toast.Component';

export const Bookmarks = () => {
  const { user, loading } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [animation, setAnimation] = useState('');
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
        copyToClipboard={() => copyToClipboard(prompt.title)}
        deleteBookmark={() => deleteRating(prompt.id)}
      />
    </div>
  ));
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);
  const copyToClipboard = (item) => {
    navigator.clipboard.writeText(item);

    setOpenToast(true);
    setAnimation('open-animation');

    setTimeout(() => {
      setAnimation('close-animation');
    }, 2000);
    setTimeout(() => {
      setOpenToast(false);
    }, 2500);
  };
  return (
    <>
      <Helmet>
        <title>Bookmarks</title>
      </Helmet>
      <main>
        <h1 className="hero-title">Bookmarks</h1>
        <div className="container-favorites">
          {favoritesList}
          <Toast open={openToast} overlayClass={`toast ${animation}`} right="0">
            <span>Copied to clipboard!</span>
          </Toast>
        </div>
      </main>
    </>
  );
};
