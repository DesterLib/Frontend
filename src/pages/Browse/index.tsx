import React, { useState } from 'react';

import DButton from '../../components/DButton';
import { get } from '../../utilities/requests';
import { MainContainer } from './styles';

const BrowsePage = () => {
    const [data, setData] = useState<any>({});
    const [query, setQuery] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [year, setYear] = useState<number>(0);
    const [sort, setSort] = useState<string>('title:1');
    const [category, setCategory] = useState<number>(-1);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(20);
    const [mediaType, setMediaType] = useState<string>('movies');
    const [requestInfo, setRequestInfo] = useState<any>({});

    const handleSearch = async () => {
        const params = `?query=${query}&genre=${genre}&year=${year}&sort=${sort}&category=${category}&media_type=${mediaType}&page=${page}&limit=${limit}`;
        get(`/browse/${category}/${page}${params}`, setData, setRequestInfo, () => {
            console.log();
        });
    };

    return (
        <MainContainer>
            <DButton onClick={handleSearch}>Search</DButton>
        </MainContainer>
    );
};

export default BrowsePage;
