namespace cdm_quiz_backend.Models.Backend
{
    public class Quiz
    {
        public Guid Id { get; set; }

        public string Name {get; set;} = string.Empty;

        public List<Question>? Questions { get; set; }
    }
}