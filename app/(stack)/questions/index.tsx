import { quizQuestionsAction } from "@/core/actions/questions/quiz-questions.actions";
import { Question } from "@/infrastructure/interfaces/question.interface";
import { useQuestions } from "@/presentation/hooks/useQuestions";
import React, { useState, useEffect } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const QuestionsScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { questionQuery } = useQuestions();
  //>>>>>>>>>>>>>>>>>>>>>>>>

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [loading, setLoading] = useState(true);
  // const [score, setScore] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState<Boolean>(false);
  // const handleAnswer = (answer: string) => {
  //   const currentQuestion = questions[currentQuestionIndex];
  //   const isCorrect = answer === currentQuestion.correct_answer;
  //   setSelectedAnswer(isCorrect);

  //   if (isCorrect) {
  //     setScore(
  //       (prevScore) => prevScore + (currentQuestion.type === "boolean" ? 5 : 10)
  //     );
  //   }

  //   setTimeout(() => {
  //     if (currentQuestionIndex < questions.length - 1) {
  //       setCurrentQuestionIndex(currentQuestionIndex + 1);
  //       setSelectedAnswer(null);
  //     } else {
  //       alert(`Juego terminado! Puntuación: ${score}/${questions.length * 10}`);
  //     }
  //   }, 1000);
  // };

  // const currentQuestion = questions[currentQuestionIndex];
  // const shuffledAnswers = [
  //   ...currentQuestion.incorrect_answers,
  //   currentQuestion.correct_answer,
  // ].sort(() => Math.random() - 0.5);
  ////////////////

  if (questionQuery.isLoading) {
    return (
      <View className=" justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className=" mt-2 " style={{ paddingTop: safeArea.top }}>
      <FlatList
        data={questionQuery.data}
        keyExtractor={(item) => item.question}
        horizontal
        renderItem={({ item }) => (
          <SlideQuestion
            question={item}
            onAnswer={() => {}}
            selectedAnswer={null}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  difficulty: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuestionsScreen;

interface SlideQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}

const SlideQuestion = ({
  question,
  onAnswer,
  selectedAnswer,
}: SlideQuestionProps) => {
  const { width, height } = useWindowDimensions();

  // const shuffledAnswers = [
  //   ...question.incorrect_answers,
  //   question.correct_answer,
  // ].sort(() => Math.random() - 0.5);

  const shuffledAnswers = [...question.options].sort(() => Math.random() - 0.5);

  return (
    <View style={[styles.container, { width, height }]}>
      <Text style={styles.category}>{question.category}</Text>
      <Text style={styles.difficulty}>Dificultad: {question.difficulty}</Text>
      <Text style={styles.question}>{question.question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onAnswer(answer)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.buttonText}>{answer}</Text>
        </TouchableOpacity>
      ))}
      {selectedAnswer !== null && (
        <Text style={styles.feedback}>
          {selectedAnswer ? "Respuesta correcta!" : "Respuesta incorrecta!"}
        </Text>
      )}
    </View>
  );
};
