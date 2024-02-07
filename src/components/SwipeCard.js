
const SwipeCard = ({ date, name, school, studentclass, status, studentid, transporttype, pickuptime, dismissaltime }) => {
    return (
        <View style={styles.placeholderInset}>
            <PageTitle>{name}</PageTitle>
            <ExtraText>{date}</ExtraText>
            <ExtraText>{school}</ExtraText>
            <ExtraText>{status}</ExtraText>
            <Line></Line>
            <StyledScheduleView>
                <Ionicons name="bus-outline" size={30} color="black" />
                <StyledContainer>
                    <NormText>{pickuptime} - {dismissaltime}</NormText>
                </StyledContainer>
            </StyledScheduleView>
            <Line></Line>
            <StyledContainer>
                <NormText>{studentid} {studentclass} {transporttype}</NormText>
            </StyledContainer>
        </View>
    );
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