import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Onboardingslides" options={{ title: "Onboardingslides" , headerShown : false }} />
      <Stack.Screen name="Signup" options={{ title: "Sign Up" , headerShown : false  }} />
      <Stack.Screen name="Login" options={{ title: "Log In"  , headerShown : false }} />
      <Stack.Screen name="(tabs)" options={{ title: "Log In"  , headerShown : false }} />


    </Stack>
  );
};
