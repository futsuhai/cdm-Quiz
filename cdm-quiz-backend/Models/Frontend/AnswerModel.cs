namespace cdm_quiz_backend.Models.Frontend
{
    public class AnswerModel
    {
        public string QuizId { get; set; } = string.Empty;
        public string QuestionId { get; set; } = string.Empty;
        public string AnswerOption { get; set; } = string.Empty;
    }
}