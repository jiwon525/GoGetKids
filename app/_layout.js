import { Stack } from "expo-router";
import ParentLayout from "./parent/_layout";
/** <Stack.Screen name="index" options={{ headerShown: false }} />*/
const StackLayout = () => {

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="loading" options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" options={{ headerShown: false }} />
            <Stack.Screen name="parent" options={{ headerShown: false }} />
            <Stack.Screen name="teacher" options={{ headerShown: false }} />
            <Stack.Screen name="driver" options={{ headerShown: false }} />
        </Stack>
    );
};

export default StackLayout;
