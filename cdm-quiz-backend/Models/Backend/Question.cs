namespace cdm_quiz_backend.Models.Backend
{
    public class Question
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public Dictionary<string, bool> Answers { get; set; }
    }
}