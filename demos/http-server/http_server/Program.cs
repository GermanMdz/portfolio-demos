using System.Net;
using Microsoft.Extensions.Logging;

namespace http_server;

public static class Program
{
    public static void Main(string[] args)
    {
        using var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        var logger = loggerFactory.CreateLogger("Program");

        ushort port = 5002;
        string? directory = null;
        string? staticRoot = null;

        for (int i = 0; i < args.Length; i++)
        {
            switch (args[i])
            {
                case "--port":
                    if (i + 1 < args.Length && ushort.TryParse(args[i + 1], out var parsedPort))
                    {
                        port = parsedPort;
                        i++;
                    }
                    break;
                case "--directory":
                    if (i + 1 < args.Length)
                    {
                        directory = args[i + 1];
                        i++;
                    }
                    break;
                case "--static":
                    if (i + 1 < args.Length)
                    {
                        staticRoot = args[i + 1];
                        i++;
                    }
                    break;
            }
        }

        directory ??= Path.Combine(AppContext.BaseDirectory, "demo-files");
        staticRoot ??= Path.Combine(AppContext.BaseDirectory, "static");

        Directory.CreateDirectory(directory);
        Directory.CreateDirectory(staticRoot);

        logger.LogInformation("Starting HTTP server on port {Port}. File directory: {Directory}. Static root: {StaticRoot}", port, directory, staticRoot);

        var server = new HttpServer(IPAddress.Any, port, logger, directory, staticRoot);
        server.Start();
    }
}
