using cdm_quiz_backend.Models.Backend;

public class QuestionService : IQuestionService
{
    private readonly IList<Question> _questions;
    public QuestionService()
    {
        _questions = new List<Question>
        {
            new Question
            {
                Id = Guid.NewGuid(),
                Title =  "1. What is the capital of France?",
                Answers = new Dictionary<string, bool>
                {
                    {"London", false},
                    {"Paris", true },
                    {"Berlin", false},
                    {"Rome", false}
                }
            },
            new Question
            {
                Id = Guid.NewGuid(),
                Title =  "2. What is the capital of France?",
                Answers = new Dictionary<string, bool>
                {
                    {"London", false},
                    {"Paris", true },
                    {"Berlin", false},
                    {"Rome", false}
                }
            },
            new Question
            {
                Id = Guid.NewGuid(),
                Title =  "3. What is the capital of France?",
                Answers = new Dictionary<string, bool>
                {
                    {"London", false},
                    {"Paris", true },
                    {"Berlin", false},
                    {"Rome", false}
                }
            },

        };
    }

    public Task<IList<Question>> GetAllAsync()
    {
        return Task.FromResult(_questions);
    }

    public Task CreateAsync(Question item)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Question> GetAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Guid id, Question item)
    {
        throw new NotImplementedException();
    }
}