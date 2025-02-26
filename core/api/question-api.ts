import axios from "axios";
export const questionApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_QUESTION_URL,
  params: {
    amount: 10,
  },
});
// https://opentdb.com/api.php >>>> seria el valor de process.env.EXPO_PUBLIC_QUESTION_URL a motivos practicos
