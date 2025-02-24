import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const QUIZ_API_URL = "https://opentdb.com/api.php?amount=10";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetch(QUIZ_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    setSelectedAnswer(isCorrect);

    if (isCorrect) {
      setScore(
        (prevScore) => prevScore + (currentQuestion.type === "boolean" ? 5 : 10)
      );
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        alert(`Juego terminado! Puntuación: ${score}/${questions.length * 10}`);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{currentQuestion.category}</Text>
      <Text style={styles.difficulty}>
        Dificultad: {currentQuestion.difficulty}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleAnswer(answer)}
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

export default QuizApp;
