import React, {useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import AnimeList from "../components/anime-list";
import styled from "styled-components";
import Navbar from "../components/navbar";
import { fetchAnimeList } from '../redux/actions';

export default function Homepage() {
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    const [filterSelected,setFilterSelected] = useState('popular');

    const handleFilterChange = (filter = filterSelected) => {
        dispatch(fetchAnimeList(filter,page));
    };

    useEffect(() => {
        dispatch(fetchAnimeList(filterSelected, page));
    }, [filterSelected]);


    return (
        <HomepageStyled>
            <Navbar onFilterChange={handleFilterChange} setPage={setPage} setFilterSelected={setFilterSelected} page={page}/>
            <AnimeList filterSelected={filterSelected} page={page} setPage={setPage} onFilterChange={handleFilterChange}/>
        </HomepageStyled>
    );
}

const HomepageStyled = styled.div`
    padding-top: 70px;
`;

