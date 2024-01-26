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
    bgrey: "#928E85",
};

const { primary, plain, secondary, tertiary, darkLight, night, blue, bgrey } = Colors;

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

export const LoginTab = styled.View`
    width: ${deviceWidth}px;
    height: ${deviceHeight * 0.3}px;
    background-color: ${primary};
    padding-bottom: 10px;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const LeftIcon = styled.View`
    left:15px;
    top:38px;
    position:absolute;
    z-index: 1;
`;

export const AlignRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Line = styled.View`
    height: 1px;
    flex:1;
    backgroundColor: ${darkLight};
    margin-vertical: 5px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items:center;
    padding:10px;
`;

export const ProfileContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const BottomContainer = styled.View`
    flex:1;
    justify-content:flex-end;

`;

export const LoginLogo = styled.Image`
    width: ${deviceWidth * 0.3}px;
    height:${deviceHeight * 0.3}px;
`;
export const LoginSmallLogo = styled.Image`
    width: 45px;
    height: 45px;
    margin-left: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const LoginTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    padding: 10px;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    margin-left:
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
    height: 50px;

    ${(props) => props.teacher == true && `
    background-color: ${blue};
    `}
    ${(props) => props.driver == true && `
    background-color: ${bgrey};
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

export const BackIcon = styled.TouchableOpacity`
    background-color: Colors.tertiary;
    width: 45px;
    height: 45px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const NormText = styled.Text`
    color: ${night};
    font-size:18px;
`;