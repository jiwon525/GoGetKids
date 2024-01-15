import styled from 'styled-components/native';
import { View, Image, Text, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';
//import Constants from 'expo-constants';

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const Colors = {
    primary: '#FFE88A',
    plain: '#FFFFFF',
    secondary: '#E5E7EB',
    tertiary: '#6D28D9',
    darkLight: "#9CA3AF",
    night: "#000000",
    blue: "#66B2FF",
};

const { primary, plain, secondary, tertiary, darkLight, night, blue } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    background-color: ${plain};
`;

export const InnerMidContainer = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    padding-top:10px;
    align-items: center;
`;

export const LoginLogo = styled.Image`
    width: ${deviceWidth * 0.3}px;
    height:${deviceHeight * 0.3}px;
`;

export const LoginTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding: 10px;
`;

export const pageTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
`;

export const LoginTab = styled.View`
    padding-top: 25px;
    width: ${deviceWidth}px;
    height: ${deviceHeight * 0.3}px;
    background-color: ${primary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left:55px;
    padding-right:55px;
    border-radius:5px;
    font-size:16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size:13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right:15px;
    top:38px;
    position:absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color: ${primary};
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.teacher == true && `
    background-color: ${blue};
    `}
`;

export const ButtonText = styled.Text`
    color: ${night};
    font-size:16px;
`;

export const MsgBox = styled.Text`
    text-align:center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: ${deviceWidth}px;
    backgroundColor: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items:center;
    padding:10px;
`;

export const ExtraText = styled.Text`
    justify-content:center;
    align-content: center;
    color: ${night};
    font-size:15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${tertiary};
    font-size:15px;
`;
