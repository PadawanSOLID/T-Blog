using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SqlSugar;
using System.Data;
using System.Text;
using T_Blog.Interfaces;
using T_Blog.Services;
using T_Blog.WebApi.Models;

namespace T_Blog.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.Configure<JWTOption>(builder.Configuration.GetSection("JWT"));
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    var option = builder.Configuration.GetSection("JWT").Get<JWTOption>();
                    byte[] keyBytes = Encoding.UTF8.GetBytes(option.SecKey);
                    var secKey = new SymmetricSecurityKey(keyBytes);
                    opt.TokenValidationParameters = new()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = secKey
                    };
                });
            builder.Services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                });
            });
            builder.Services.AddScoped<ISqlSugarClient>(s =>
            {
                SqlSugarClient sqlSugar = new(new ConnectionConfig()
                {
                    ConnectionString = builder.Configuration.GetConnectionString("mysql"),
                    DbType = SqlSugar.DbType.MySql,
                    IsAutoCloseConnection = true
                });
                return sqlSugar;
            });
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IArticleService, ArticleService>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}