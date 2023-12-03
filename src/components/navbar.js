import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/logotipo.svg';
import { useDispatch } from 'react-redux';
import { fetchAnimeList } from '../redux/actions';

const Navbar = ({ setPage, setFilterSelected, page }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [listFilter, setListFilter] = useState('popular');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const handleFilterClick = (filter) => {
        if (isHomePage && listFilter !== filter){
            setListFilter(filter);
            if (page !== 1) {
                setPage(1);
                setFilterSelected(filter);
            } else {
                setFilterSelected(filter);
            }
            setSearchPerformed(false);

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            setPage(1);
            dispatch(fetchAnimeList('search', 1, searchTerm));
            setSearchPerformed(true);
        }
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <NavbarStyle>
            <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
            </Link>
            <button className="menu-button" onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
            </button>
            <div className={`right-side ${isMenuOpen ? 'open' : ''}`}>
                <div
                    className={searchPerformed ? '' : listFilter === 'popular' ? 'selected' : ''}
                    onClick={() => handleFilterClick('popular')}
                >
                    Popular
                </div>
                <div
                    className={searchPerformed ? '' : listFilter === 'upcoming' ? 'selected' : ''}
                    onClick={() => handleFilterClick('upcoming')}
                >
                    Upcoming
                </div>
                <div
                    className={searchPerformed ? '' : listFilter === 'airing' ? 'selected' : ''}
                    onClick={() => handleFilterClick('airing')}
                >
                    Airing
                </div>
                <div
                    className={searchPerformed ? '' : listFilter === 'top' ? 'selected' : ''}
                    onClick={() => handleFilterClick('top')}
                >
                    Top
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                    />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
        </NavbarStyle>
    );
};

const NavbarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 0;
  background-color: white;
  z-index: 1000;
  height: 75px;

  form {
    position: relative;

    input {
      width: 200px;
      height: 40px;
      font-size: 16px;
      padding: 0 20px 0 30px;
      border-radius: 40px;
      outline: none;
      border: solid #EDEDED 2px;
    }

    button {
      border: none;
      position: absolute;
      border-radius: 25px;
      zoom: 1.5;
      background-color: rgba(255, 61, 0, 0.71);
      color: white;
      height: 100%;
      aspect-ratio: 1.5 / 1;
      right: 0;
      cursor: pointer;
    }

  }

  .menu-button {
    display: none;
    @media (max-width: 1030px) {
      margin-right: 3rem;
      zoom: 1.5;
      display: block;
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
  }

  .right-side {
    padding-right: 4rem;
    display: flex;
    align-items: center;
    gap: 20px;

    div {
      padding: 0 10px;
    }

    @media (max-width: 1030px) {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 75px;
      left: 0;
      background-color: white;
      width: 100%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      
      form{
        order: -1;
      }
      

      &.open {
        display: flex;
        padding: 1rem 0;
        justify-content: center;
      }

      div {
        width: 100%;
        padding-bottom: 15px;
        text-align: center;

        &.selected {
          color: #FF3D00;
        }

        &:hover {
          color: #FF3D00;
        }
      }
    }

    div {
      font-size: 1.2rem;
      font-weight: 600;

      &.selected {
        color: #FF3D00;
      }

      &:hover {
        color: #FF3D00;
      }

      cursor: pointer;
    }
  }

  .logo {
    padding: 0 2rem 0 4rem;
    height: 75px;
  }

  @media (max-width: 768px) {
    .logo {
      padding: 0 1rem;
    }
    .menu-button{
      margin: 0 1.5rem;
    }
  }
`;

export default Navbar;
