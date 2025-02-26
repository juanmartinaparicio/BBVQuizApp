import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/shered/CustomButton";
import { useQuestions } from "@/presentation/hooks/useQuestions";

const ProfileScreen = () => {
  const { questionQuery } = useQuestions();
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          className="mb-2"
          color="primary"
          onPress={() => router.push("/questions")}
        >
          Preguntas
        </CustomButton>
        <CustomButton
          className="mb-2"
          color="secondary"
          onPress={() => router.push("/profile")}
        >
          Perfil
        </CustomButton>
        <CustomButton
          className="mb-2"
          color="tertiary"
          onPress={() => router.push("/settings")}
        >
          Ajustes
        </CustomButton>
        {/* <Link href="/products" className="text-blue-500 px-10 mb-10">
          products{""}
        </Link>
        <Link href="/profile" className="text-blue-500 px-10 mb-10">
          profile {""}
        </Link>
        <Link href="/settings" className="text-blue-500 px-10 mb-10">
          Ajustes
        </Link> */}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
