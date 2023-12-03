import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/logotipo.svg';
import { useDispatch } from 'react-redux';
import { fetchAnimeList } from '../redux/actions';

const Navbar = ({ onFilterChange }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [listFilter, setListFilter] = useState('popular');
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const handleFilterClick = (filter) => {
        if (isHomePage && listFilter !== filter){
            setListFilter(filter);
            onFilterChange(filter);
        } else if (!isHomePage){

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchAnimeList('search', searchTerm));
    };

    return (
        <NavbarStyle>
            <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
            </Link>
            <div className="right-side">
                <div onClick={() => handleFilterClick('popular')}>Popular</div>
                <div onClick={() => handleFilterClick('upcoming')}>Upcoming</div>
                <div onClick={() => handleFilterClick('airing')}>Airing</div>
                <div onClick={() => handleFilterClick('top')}>Top</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </NavbarStyle>
    );
};

const NavbarStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 0;
  background-color: white;
  z-index: 1000;
  height: 75px;
  .right-side {
    padding: 0 4rem;
    display: flex;
    align-items: center;
    gap: 10px;
    div {
      font-size: 1.2rem;
      font-weight: 600;
      &:hover{
        color: #FF3D00;
      }
      cursor: pointer;
    }
  }
  .logo {
    padding: 0 4rem;
    height: 75px;
  }
`;

export default Navbar;
