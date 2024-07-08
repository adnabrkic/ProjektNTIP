import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type_of: '',
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjE2YWI2YzVlNDc1MTZkMGE5MzYyNzE1N2ZjMjYxMSIsIm5iZiI6MTcyMDM4ODgyMS44NjEwNDksInN1YiI6IjY2OGIwMmNiMzU0NDdiYmEyN2IxMzU5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fazdufTu3L4lXAR4eP3xL_l1buCLwpReQgqMpUrRsZg',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response); 
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]);
        } else {
          console.error('No videos found');
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={() => navigate(-2)} />
      {apiData.key ? (
        <>
          <iframe
            width='90%'
            height='90%'
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title='trailer'
            frameBorder='0'
            allowFullScreen
          ></iframe>
          <div className='player-info'>
            <p>{apiData.published_at.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Player;
