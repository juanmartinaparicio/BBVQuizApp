import { questionApi } from "@/core/api/question-api";
import type { QuestionResponse } from "@/infrastructure/interfaces/opentdb-responses";
import { QuestionMapper } from "@/infrastructure/mappers/question.mapper";

export const quizQuestionsAction = async () => {
  try {
    const { data } = await questionApi.get<QuestionResponse>("");
    const questions = data.results.map(
      QuestionMapper.fromApiQuestionToQuestion
    );
    console.log("Questios", JSON.stringify(questions, null, 2));
    return questions;
  } catch (error) {
    console.log(error);
    throw "Error fetching questions";
  }
};
