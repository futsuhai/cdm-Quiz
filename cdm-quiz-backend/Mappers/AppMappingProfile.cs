using AutoMapper;
using cdm_quiz_backend.Models.Backend;
using cdm_quiz_backend.Models.Frontend;

namespace cdm_quiz_backend.Mappers
{
    public class AppMappingProfile : Profile
    {
        public AppMappingProfile()
        {
            CreateMap<QuizModel, Quiz>()
                .ReverseMap();
            CreateMap<QuestionModel, Question>()
                .ReverseMap()
                .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers.Keys.ToArray()));
        }
    }
}