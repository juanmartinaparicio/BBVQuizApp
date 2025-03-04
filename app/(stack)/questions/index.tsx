import SlideQuestion from "@/components/shered/SlideQuestion";
import { quizQuestionsAction } from "@/core/actions/questions/quiz-questions.actions";
import { Question } from "@/infrastructure/interfaces/question.interface";
import { useQuestions } from "@/presentation/hooks/useQuestions";
import { router } from "expo-router";
import React, { useState, useRef } from "react";
import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

const QuestionsScreen = () => {
  // const safeArea = useSafeAreaInsets();
  const { questionQuery } = useQuestions();
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleAnswer = (answer: string, item: Question) => {
    if (answer === item.correct_answer) {
      if (item.type === "multiple") {
        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => prevScore + 5);
      }
      Alert.alert("Respuesta correcta", "Asi se hace!!!", [
        {
          text: "OK",
          onPress: changeSlide,
        },
      ]);
    } else {
      Alert.alert("Respuesta incorrecta", "Vamos tu puedes!!!", [
        {
          text: "OK",
          onPress: changeSlide,
        },
      ]);
    }
  };

  const changeSlide = () => {
    if (currentSlideIndex < 9) {
      scrollToSlide(currentSlideIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToIndex({ index: index, animated: true });
  };

  if (questionQuery.isLoading) {
    return (
      <View className=" justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (showResult) {
    return (
      <SafeAreaView className="bg-black items-center">
        <Text className="text-[#fff] font-bold text-4xl mt-40 mb-20">
          Felicidades has terminado el juego
        </Text>
        <Text className="text-[#fff] text-3xl mb-40">
          Tu puntaje es: {score}
        </Text>
        <TouchableOpacity
          className="bg-yellow-500 justify-end p-2 rounded mt-2"
          onPress={() => {
            router.push("/(stack)/home");
          }}
        >
          <Text className="font-semibold text-xl">Volver al inicio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className=" mt-2 ">
      <FlatList
        ref={flatListRef}
        data={questionQuery.data}
        keyExtractor={(item) => item.question}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        scrollEnabled={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <SlideQuestion
            question={item}
            onAnswer={(option) => {
              handleAnswer(option, item);
            }}
            selectedAnswer={null}
          />
        )}
      />
    </View>
  );
};

export default QuestionsScreen;
