using AutoMapper;
using cdm_quiz_backend.Models.Frontend;
using Microsoft.AspNetCore.Mvc;

namespace cdm_quiz_backend.Controllers
{
    [ApiController]
    [Route("api/questions")]

    public class QuestionController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly IMapper _mapper;
        private readonly ILogger<QuestionController> _logger;

        public QuestionController(
        IQuestionService questionService,
        IMapper mapper,
        ILogger<QuestionController> logger)
        {
            _logger = logger;
            _questionService = questionService;
            _mapper = mapper;
        }

        [HttpGet("GetQuestions")]
        public async Task<List<QuestionModel>> GetQuestions()
        {
            var questions = await _questionService.GetAllAsync();
            return _mapper.Map<List<QuestionModel>>(questions);
        }

        [HttpPost("ChooseAnswer")]
        public async Task<IActionResult> ChooseAnswer([FromBody] Answer answer)
        {
            var questions = await _questionService.GetAllAsync();
            var matchingQuestion = questions.FirstOrDefault(q => q.Id.ToString() == answer.QuestionId);
            if (matchingQuestion != null)
            {
                matchingQuestion.Answers.TryGetValue(answer.AnswerString, out bool value);
                if (value)
                {
                    int indexOfTrue = matchingQuestion.Answers.Values.ToList().IndexOf(value);
                    var result = new { Value = value, IndexOfTrue = indexOfTrue };
                    return Ok(result);
                } else {
                    int indexOfTrue = matchingQuestion.Answers.Values.ToList().IndexOf(true);
                    var result = new { Value = false, IndexOfTrue = indexOfTrue };
                    return Ok(result);
                }
            }
            return Ok("Такого вопроса не существует"); // Что вернуть?
        }
    }
}