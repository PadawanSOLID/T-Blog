namespace T_Blog.Entity
{
    public class Article:BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Channel_Id { get; set; }
        public int CoverType { get; set; }
        public string[] Images { get; set; }
    }
}