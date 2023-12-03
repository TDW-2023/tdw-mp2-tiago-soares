import React from 'react';
import styled from "styled-components";
import Navbar from "../components/navbar";
import AnimeDetail from "../components/anime-detail";

export default function AnimePage() {
    return (
        <HomepageStyled>
            <AnimeDetail/>
        </HomepageStyled>
    );
};

const HomepageStyled = styled.div`
`