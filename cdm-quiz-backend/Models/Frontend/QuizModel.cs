using cdm_quiz_backend.Models.Frontend;

namespace cdm_quiz_backend.Models.Backend
{
    public class QuizModel
    {
        public string Id { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public List<QuestionModel>? Questions { get; set; }
    }
}