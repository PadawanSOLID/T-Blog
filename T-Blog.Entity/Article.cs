using SqlSugar;

namespace T_Blog.Entity
{
    public class Article:BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Channel_Id { get; set; }
        public int CoverType { get; set; }
        public int Status { get; set; }
        [SugarColumn(Length =1000)]
        public string Images { get; set; }
        public string CreateTime { get; set; }

        [SugarColumn(IsNullable =true)]
        public string PubDate{ get; set; }
        public int Like_Count { get; set; }
        public int Comment_Count { get; set; }
        public int Read_Count { get; set; }
    }
}