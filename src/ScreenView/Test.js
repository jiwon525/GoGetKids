import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import fetchData from '../../api/students';

const Test = () => {
    useEffect(() => {
        const getData = async () => {
            await fetchData();
        };

        getData();
    }, []);

    return (
        <></>
    );
};

export default Test;