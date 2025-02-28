import { View, Text } from "react-native";
import React from "react";
import { useQuestions } from "@/presentation/hooks/useQuestions";
import { quizQuestionsAction } from "@/core/actions/questions/quiz-questions.actions";

const ProileScreen = () => {
  const { questionQuery } = useQuestions();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Text>{JSON.stringify(questionQuery.data, null, 2)}</Text>
    </View>
  );
};

export default ProileScreen;
