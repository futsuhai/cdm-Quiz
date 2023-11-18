namespace cdm_quiz_backend.Services
{
    public interface IService<T> where T : class
    {
        public Task<IList<T>> GetAllAsync();

        public Task<T> GetAsync(Guid id);

        public Task DeleteAsync(Guid id);

        public Task CreateAsync(T item);

        public Task UpdateAsync(Guid id, T item);
    }
}