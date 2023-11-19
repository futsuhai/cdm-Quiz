using cdm_quiz_backend.Models.Backend;
using cdm_quiz_backend.Models.Frontend;

namespace cdm_quiz_backend.Services.QuizService
{
    public interface IQuizService : IService<Quiz>
    {
        public Task<AnswerResultModel> ChooseAnswer(AnswerModel answer);
    }
}