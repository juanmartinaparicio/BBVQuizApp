import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="questions/index"
        options={{ title: "Preguntas", animation: "flip", headerShown: false }}
      />
      <Stack.Screen name="profile/index" options={{ title: "Perfil" }} />
      <Stack.Screen name="settings/index" options={{ title: "Ajustes" }} />
    </Stack>
  );
};

export default StackLayout;
