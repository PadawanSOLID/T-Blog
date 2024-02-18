namespace T_Blog.WebApi.Models
{
    public class JWTOption
    {
        public string SecKey { get; set; }

        public int ExpiredSeconds { get; set; }
    }
}
