import { quizQuestionsAction } from "@/core/actions/questions/quiz-questions.actions";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = () => {
  const questionQuery = useQuery({
    queryKey: ["questions"],
    queryFn: () => quizQuestionsAction(),
    staleTime: 1000 * 60 * 60, // 1 hora de cache
  });

  return { questionQuery };
};
