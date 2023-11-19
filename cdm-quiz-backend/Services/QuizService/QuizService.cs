using cdm_quiz_backend.Models.Backend;
using cdm_quiz_backend.Models.Frontend;

namespace cdm_quiz_backend.Services.QuizService
{
    public class QuizService : IQuizService
    {
        private readonly IList<Quiz> _quizzes;
        public QuizService()
        {
            _quizzes = new List<Quiz>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Capitals",
                    Questions = new List<Question>
                    {
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Title = "1. What is the capital of France?",
                            Answers = new Dictionary<string, bool>
                            {
                                {"London", false},
                                {"Paris", true},
                                {"Berlin", false},
                                {"Rome", false}
                             }
                        },
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Title = "2. What is the capital of German?",
                            Answers = new Dictionary<string, bool>
                            {
                                {"London", false},
                                {"Paris", false},
                                {"Berlin", true},
                                {"Rome", false}
                            }
                        }
                    }
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    Name = "Animals",
                    Questions = new List<Question>
                    {
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Title = "1. What is the biggest animal?",
                            Answers = new Dictionary<string, bool>
                            {
                                {"Giraffe", false},
                                {"Whale", true},
                                {"Cat", false},
                                {"Dog", false}
                             }
                        },
                        new()
                        {
                            Id = Guid.NewGuid(),
                            Title = "2. What is the smallest animal?",
                            Answers = new Dictionary<string, bool>
                            {
                                {"Cat", false},
                                {"Dog", false},
                                {"Rabbit", false},
                                {"Mouse", true}
                            }
                        }
                    }
                },
            };
        }

        public Task<IList<Quiz>> GetAllAsync()
        {
            return Task.FromResult(_quizzes);
        }

        public Task CreateAsync(Quiz item)
        {
            _quizzes.Add(item);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var quizToRemove = _quizzes.FirstOrDefault(q => q.Id == id);
            if (quizToRemove != null)
            {
                _quizzes.Remove(quizToRemove);
            }
            return Task.CompletedTask;
        }

        public Task<Quiz> GetAsync(Guid id)
        {
            var quiz = _quizzes.FirstOrDefault(q => q.Id == id);
            if (quiz != null)
            {
                return Task.FromResult(quiz);
            }
            return Task.FromResult<Quiz>(null); // исправить 
        }

        public Task UpdateAsync(Guid id, Quiz item)
        {
            var existingQuiz = _quizzes.FirstOrDefault(q => q.Id == id);
            if (existingQuiz != null)
            {
                existingQuiz.Name = item.Name;
                existingQuiz.Questions = item.Questions;
                return Task.CompletedTask;
            }
            return Task.FromResult(false);
        }

        public Task<AnswerResultModel> ChooseAnswer(AnswerModel answer)
        {
            var currentQuiz = _quizzes.FirstOrDefault(q => q.Id.ToString() == answer.QuizId);
            if (currentQuiz != null)
            {
                var currentQuestion = currentQuiz?.Questions?.FirstOrDefault(q => q.Id.ToString() == answer.QuestionId);
                if (currentQuestion != null)
                {
                    bool value = false;
                    currentQuestion?.Answers?.TryGetValue(answer.AnswerString, out value);
                    int indexOfTrue = currentQuestion.Answers.Values.ToList().IndexOf(true); // исправить
                    AnswerResultModel result = new()
                    {
                        Result = value,
                        Index = indexOfTrue
                    };
                    return Task.FromResult(result);
                }
            }
            throw new InvalidOperationException("Question or quiz not found.");
        }
    }
}