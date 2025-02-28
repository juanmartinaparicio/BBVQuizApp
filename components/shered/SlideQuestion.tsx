import { Question } from "@/infrastructure/interfaces/question.interface";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface SlideQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string | null;
}

const SlideQuestion = ({
  question,
  onAnswer,
  selectedAnswer,
}: SlideQuestionProps) => {
  const { width, height } = useWindowDimensions();

  const shuffledAnswers = [...question.options].sort(() => Math.random() - 0.5);

  return (
    <View
      className="bg-[#0f0f0f] flex-1  items-center p-3"
      style={{ width, height }}
    >
      <Text className="  mt-20 mb-10 font-bold text-[#fff] align-sub text-3xl">
        {question.question}
      </Text>
      <Text className=" font-bold mb-3 text-[#fff]">
        {" "}
        Category: {question.category}
      </Text>
      <Text className="color-gray-400 mb-20 justify-start ">
        Dificulty: {question.difficulty}
      </Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          className=" bg-yellow-500 p-1 mb-2 w-80 h-14 items-center rounded-lg justify-center"
          onPress={() => onAnswer(answer)}
          disabled={selectedAnswer !== null}
        >
          <Text className="text-[#333] font-bold text-xl">{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default SlideQuestion;
