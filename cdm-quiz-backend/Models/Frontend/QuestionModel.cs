namespace cdm_quiz_backend.Models.Frontend
{
    public class QuestionModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string[] Answers { get; set; }
    }
}