using AutoMapper;
using cdm_quiz_backend.Models.Backend;
using cdm_quiz_backend.Models.Frontend;

public class AppMappingProfile : Profile
{
    public AppMappingProfile()
    {
        CreateMap<QuestionModel, Question>()
            .ReverseMap()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers.Keys.ToArray()));
    }
}