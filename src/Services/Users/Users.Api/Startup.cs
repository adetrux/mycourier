using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Users.Dal;
using Users.Domain;

namespace Users.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", builder =>
                {
                    builder.WithOrigins(
                        "http://localhost:8000", // web in docker
                        "http://localhost:3000", // web
                        "http://192.168.0.80:19000") // mobile
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                });
            });

            services.AddControllers();

            services.AddTransient<IUsersRepository, UsersRepository>();

            services.AddDbContext<UsersDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlite(Configuration.GetConnectionString("SqliteConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>(option =>
            {
                option.User.RequireUniqueEmail = true;
                option.Password.RequireDigit = false;
                option.Password.RequiredLength = 6;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequireLowercase = false;
                option.Password.RequireUppercase = false;
            })
            .AddEntityFrameworkStores<UsersDbContext>()
            .AddDefaultTokenProviders();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var serviceProvider = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope()
                .ServiceProvider;

            var context = serviceProvider.GetRequiredService<UsersDbContext>();
            if (!context.Database.EnsureCreated())
            {
                context.Database.Migrate();
            }

            Seed.Initialize(serviceProvider);

            app.UseCors("MyPolicy");

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
