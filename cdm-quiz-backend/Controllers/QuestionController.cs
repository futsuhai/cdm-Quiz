using AutoMapper;
using cdm_quiz_backend.Models.Backend;
using cdm_quiz_backend.Services.QuizService;
using Microsoft.AspNetCore.Mvc;

namespace cdm_quiz_backend.Controllers
{
    [ApiController]
    [Route("api/quizzes")]

    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly IMapper _mapper;
        private readonly ILogger<QuizController> _logger;

        public QuizController(
        IQuizService quizService,
        IMapper mapper,
        ILogger<QuizController> logger)
        {
            _logger = logger;
            _quizService = quizService;
            _mapper = mapper;
        }

        [HttpGet("GetQuizzes")]
        public async Task<List<QuizModel>> GetQuizzes()
        {
            var quizzes = await _quizService.GetAllAsync();
            return _mapper.Map<List<QuizModel>>(quizzes);
        }

        [HttpGet("GetQuiz/{id}")]
        public async Task<QuizModel> GetQuiz(string id)
        {
            var parsedId = Guid.Parse(id);
            var quiz = await _quizService.GetAsync(parsedId);
            return _mapper.Map<QuizModel>(quiz);
        }
    }
}