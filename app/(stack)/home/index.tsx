import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <>
      <ImageBackground
        source={require("../../../assets/images/WhatsApp Image 2025-02-25 at 23.34.30.jpeg")}
        className="flex-1 justify-center items-center resize-y"
      >
        <View className="flex-1 justify-end items-center">
          <TouchableOpacity
            className="bg-yellow-500 px-20 py-2 mb-4 rounded-lg"
            onPress={() => router.push("/(stack)/questions")}
          >
            <Text className="text-2xl font-bold text-[#333]">
              Iniciar Partida
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar />
    </>
  );
};

export default HomeScreen;
