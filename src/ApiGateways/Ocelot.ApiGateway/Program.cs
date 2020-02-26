using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Ocelot.DependencyInjection;
using Ocelot.Provider.Consul;

namespace Ocelot.ApiGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config
                    .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                    .AddJsonFile("appsettings.json", false, true)
                    //.AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                    .AddJsonFile("ocelot.json", false, true);
                    //.AddJsonFile($"configuration.{hostingContext.HostingEnvironment.EnvironmentName}.json")
                    //.AddEnvironmentVariables();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureLogging(configureLogging =>
                {
                    configureLogging.AddConsole();
                });

        //public static IWebHost BuildWebHost(string[] args)
        //{
        //    var builder = WebHost.CreateDefaultBuilder(args);

        //    builder.ConfigureServices(s => s.AddSingleton(builder))
        //            .ConfigureAppConfiguration(
        //                  ic => ic.AddJsonFile("ocelot.json"))
        //            .UseStartup<Startup>();
        //    var host = builder.Build();
        //    return host;
        //}
    }
}
