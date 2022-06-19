import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DButton from '../../components/DButton';
import DLoader from '../../components/DLoader';
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
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const location: any = useLocation();
    useEffect(() => {
        const wanted_keys = [
            'query',
            'genre',
            'year',
            'sort',
            'category',
            'page',
            'limit',
            'mediaType',
        ];
        const wanted_setters = [
            setQuery,
            setGenre,
            setYear,
            setSort,
            setCategory,
            setPage,
            setLimit,
            setMediaType,
        ];
        if (location.state) {
            for (let i = 0; i < wanted_keys.length; i++) {
                if (location.state[wanted_keys[i]]) {
                    wanted_setters[i](location.state[wanted_keys[i]]);
                }
            }
        }
        setIsLoaded(true);
    }, []);

    const handleSearch = () => {
        const params = `?query=${encodeURIComponent(query)}&genre=${encodeURIComponent(
            genre,
        )}&year=${year}&sort=${encodeURIComponent(
            sort,
        )}&category=${category}&media_type=${encodeURIComponent(
            mediaType,
        )}&page=${page}&limit=${limit}`;
        get(`/browse/${category}/${page}${params}`, setData, setRequestInfo, setIsLoaded);
    };

    const handleChangeQuery = (event: any) => {
        setQuery(event.target.value || '');
    };

    const handleChangeGenre = (event: any) => {
        setGenre(event.target.value || '');
    };

    const handleChangeYear = (event: any) => {
        setYear(event.target.value || '');
    };

    const handleChangeSort = (event: any) => {
        setSort(event.target.value || 'title:1');
    };

    const handleChangeCategory = (event: any) => {
        setCategory(event.target.value || -1);
    };

    const handleChangeMediaType = (event: any) => {
        setMediaType(event.target.value || 'movies');
    };

    const handleChangePage = (event: any) => {
        setLimit(event.target.value || 0);
    };

    const handleChangeLimit = (event: any) => {
        setPage(event.target.value || 20);
    };

    console.log(data);

    return isLoaded ? (
        <MainContainer>
            <DButton onClick={handleSearch}>Search</DButton>
        </MainContainer>
    ) : (
        <DLoader />
    );
};

export default BrowsePage;
