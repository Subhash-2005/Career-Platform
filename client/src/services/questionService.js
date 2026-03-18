import api from "./api";

export const fetchQuestions = async (topic, difficulty) => {
  const res = await api.get(
    `/questions?topic=${topic}&difficulty=${difficulty}`
  );
  return res.data;
};

export const submitAttempt = async (questionId, status) => {
  const res = await api.post("/questions/attempt", {
    questionId,
    status
  });
  return res.data;
};
