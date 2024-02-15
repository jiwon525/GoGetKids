import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyledContainer } from '../src/components/styles';

const LoadingScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        </StyledContainer>
    );
};

export default LoadingScreen;
