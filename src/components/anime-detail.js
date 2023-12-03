import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnimeDetail } from '../redux/actions';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import Loader from "./loader";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AnimeDetail = ({ animeDetails, loading, fetchAnimeDetail }) => {
    const { animeID } = useParams();
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetchAnimeDetail(animeID);
    }, [animeID, fetchAnimeDetail]);

    return (
        <AnimeItemStyled>
            {loading && <Loader />}
            {!loading && (
                <>
                    <Link className="back" to={"/"}><i className="fa fa-arrow-left"></i> Back</Link>
                    <div className="animeDetails">
                        <div className="overview" style={{ alignItems: showMore ? 'center' : 'flex-start' }}>
                            <img src={animeDetails.images?.jpg.large_image_url}/>
                            <div>
                                <h1>{animeDetails.title}</h1>
                                <div className={"genres"}>
                                    <div>{animeDetails.year}</div>
                                    {animeDetails.genres?.map((genre) => (
                                        <div key={genre.mal_id}>{genre.name}</div>
                                    ))}
                                </div>
                                <p className="description">
                                    {showMore
                                        ? animeDetails.synopsis
                                        : animeDetails.synopsis?.substring(0, 450) + '...'}
                                    {animeDetails.synopsis && animeDetails.synopsis.length > 450 && (
                                        <button onClick={() => setShowMore(!showMore)}>
                                            {showMore ? 'Show Less' : 'Read More'}
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                    <Tabs>
                        <TabList>
                            <Tab>Characters</Tab>
                            <Tab>Trailer</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="characters">
                                {animeDetails.characters?.map((character, index) => (
                                    <div key={index} className="character">
                                        <img src={character.character.images.jpg.image_url} alt={character.name} />
                                        <p>{character.character.name}</p>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="trailer-con">
                                {animeDetails.trailer?.embed_url ?
                                    <iframe
                                        src={animeDetails.trailer?.embed_url}
                                        title="Inline Frame Example"
                                        width="800"
                                        height="450"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe> :
                                    <h3>Trailer not available</h3>
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </>
            )}
        </AnimeItemStyled>
    );


};


const AnimeItemStyled = styled.div`
  
  padding: 2rem 10%;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  
  .back{
    display: flex;
    gap: 20px;
    align-items: center;
    font-weight: 600;
    font-size: 25px;
    width: fit-content;
  }
  
  .react-tabs__tab-panel{
    background-color: white;
  }

  .react-tabs__tab-list{
    border: none;
    margin: 0;
    .react-tabs__tab--selected{
      border: none;
      &:focus{
        &:first-child{
          display: none;
        }
      }
    }
    .react-tabs__tab{
      padding: 1rem;
      min-width: 5rem;
      text-align: center;
    }
  }
  
  .animeDetails{
    padding: 2rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    
    .overview{
      @media only screen and (max-width: 790px) {
        flex-wrap: wrap;
        justify-content: center;
      }
      gap: 2rem;
      display: flex;
      h1{
        margin: 10px 0;
      }
      img{
        border-radius: 20px;
        height: 350px;
      }
      .genres{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        div{
          &:first-child{
            background-color: black;
          }
          font-size: 0.8rem;
          background-color: #c8807c;
          border-radius: 25px;
          padding: 5px 10px;
          color: white;
        }
      }
    }
    .description{
      margin-top: 2rem;
      line-height: 1.7rem;
      button{
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
  }
  

    .trailer-con{
      padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline: none;
            border: none;
            background-color: #FFFFFF;
        }
    }

    .details{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px;
            }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
                color: #454e56;
            }
        }
    }

    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        padding: 2rem;
        border-radius: 20px;
        .character{
            img{
                width: 100%;
                border-radius: 15px;
            }
        }
    }
`;

const mapStateToProps = state => ({
    animeDetails: state.anime.animeDetails,
    loading: state.anime.loading,
});

export default connect(mapStateToProps, { fetchAnimeDetail })(AnimeDetail);
