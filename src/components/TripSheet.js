import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import {
    PageTitle, LeftIcon, StyledLabel, StyledContainer, ListItem,
    StyledScheduleView, Line, NormText, InnerScheduleView, ExtraText, LoginSmallLogo, MostSmallLogo, ListContainer,
} from '../components/styles';


const Item = ({ address, postalcode, name }) => (
    <StyledContainer>
        <StyledScheduleView list={true}>
            <MostSmallLogo
                resizeMode="contain" source={require('../assets/student.png')} />
            <InnerScheduleView>
                <ExtraText>{name}</ExtraText>
            </InnerScheduleView>
        </StyledScheduleView>
        <ListItem>
            <NormText>{address}</NormText>
        </ListItem>
        <ListItem>
            <NormText>{postalcode}</NormText>
        </ListItem>

        <Line></Line>
    </StyledContainer>
);

export default function TripSheet({ school, zone, vehiclenum, DATA }) {
    return (
        <View style={styles.placeholderInset}>
            <PageTitle>{school}</PageTitle>
            <ExtraText>{zone}</ExtraText>
            <Line></Line>
            <StyledScheduleView>
                <Ionicons name="bus-outline" size={30} color="black" />
                <InnerScheduleView>
                    <NormText>{vehiclenum}</NormText>
                </InnerScheduleView>
            </StyledScheduleView>
            <StyledContainer>
                <Line></Line>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item address={item.address} postalcode={item.postalcode} name={item.name} />}
                    keyExtractor={item => item.id}
                />
            </StyledContainer>
        </View>
    );
}

TripSheet.propTypes = {
    school: PropTypes.string.isRequired,
    zone: PropTypes.string.isRequired,
    vehiclenum: PropTypes.string.isRequired,
    DATA: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({

    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});