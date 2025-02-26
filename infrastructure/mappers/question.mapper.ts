import { Result } from "../interfaces/opentdb-responses";
import { Question } from "../interfaces/question.interface";

export class QuestionMapper {
  static fromApiQuestionToQuestion = (question: Result): Question => {
    return {
      type: question.type,
      difficulty: question.difficulty,
      category: question.category,
      question: question.question,
      options: question.incorrect_answers.concat(question.correct_answer),
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
    };
  };
}
