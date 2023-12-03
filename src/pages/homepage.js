import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import AnimeList from "../components/anime-list";
import styled from "styled-components";
import Navbar from "../components/navbar";
import { fetchAnimeList } from '../redux/actions';

export default function Homepage() {
    const dispatch = useDispatch();

    const handleFilterChange = (filter,page) => {
        dispatch(fetchAnimeList(filter,page));
    };

    useEffect(() => {
        handleFilterChange('popular')
    }, []);

    return (
        <HomepageStyled>
            <Navbar onFilterChange={handleFilterChange} />
            <AnimeList/>
        </HomepageStyled>
    );
}

const HomepageStyled = styled.div`
    padding-top: 70px;
`;

