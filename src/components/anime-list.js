import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAnimeList } from '../redux/actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from './loader';

const AnimeList = ({ animeList, loading, page, setPage, onFilterChange, filterSelected}) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        onFilterChange(undefined, page);
    }, [page, onFilterChange]);

    return (
        <AnimeListStyle>
            {loading && <Loader />}
            {!loading && (
                <>
                    {animeList.map((anime) => (
                        <Link className={'card'} to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            {filterSelected !== 'upcoming' && <div className={'score'}>{anime.score}</div>}
                            <img src={anime.images.jpg.image_url} alt={anime.title} />
                            <div>
                                <div className={'genres'}>
                                    {anime.genres.map((genre) => (
                                        <div key={genre.mal_id}>{genre.name}</div>
                                    ))}
                                </div>
                                <p className={'title'}>{anime.title}</p>
                            </div>
                        </Link>
                    ))}
                    <div className="paginationButtons">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            Prev
                        </button>
                        <span>{page}</span>
                        <button onClick={() => handlePageChange(page + 1)}>Next</button>
                    </div>
                </>
            )}
        </AnimeListStyle>
    );
};


const AnimeListStyle = styled.div`

  @media only screen and (max-width: 790px) {
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    margin: 1rem;
    .card img {
      height: 175px !important;
    }
  }

  margin: 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;

  .card {
    position: relative;
    font-weight: 600;
    transition: linear 0.3s;

    &:hover {
      transform: translateY(-10px);
    }

    .score {
      position: absolute;
      top: 10px;
      right: 10px;
      color: white;
      background-color: black;
      padding: 5px 15px;
      border-radius: 15px;
    }

    .genres {
      margin-top: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      div {
        font-size: 0.8rem;
        background-color: #c8807c;
        border-radius: 25px;
        padding: 5px 10px;
        color: white;
      }
    }

    img {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      height: 300px;
      width: 100%;
      object-fit: cover;
      border-radius: 15px;
    }
  }

  .paginationButtons {
    display: flex;
    position: fixed;
    bottom: 50px;
    justify-content: center;
    align-items: center;
    align-self: center;
    font-weight: 600;
    background-color: white;
    border-radius: 6px;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0.7;
    
    &:hover{
      transition: linear 0.5s;
      opacity: 1;
    }

    button {
      color: #FF3D00;
      display: inline-block;
      margin: 5px;
      outline: 0;
      cursor: pointer;
      padding: 5px 16px;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      border: 1px solid;
      border-radius: 6px;
      background-color: #fafbfc;
      border-color: #1b1f2326;
      box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
      transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
      transition-property: color, background-color, border-color;

      &:disabled {
        background-color: whitesmoke;
        color: #b6b6b6;
      }

      :hover {
        background-color: #f3f4f6;
        border-color: #1b1f2326;
        transition-duration: 0.1s;
      }
    }
  }

`

const mapStateToProps = state => ({
    animeList: state.anime.animeList,
    loading: state.anime.loading,
});

export default connect(mapStateToProps, { fetchAnimeList })(AnimeList);
