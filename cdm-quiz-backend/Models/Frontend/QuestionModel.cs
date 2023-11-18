namespace cdm_quiz_backend.Models.Frontend
{
    public class QuestionModel
    {
        public string Id { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string[]? Answers { get; set; }
    }
}
