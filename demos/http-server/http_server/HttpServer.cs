using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.Extensions.Logging;

namespace http_server;

internal sealed class HttpServer : TcpServer
{
    private const string ServerHttpVersion = "HTTP/1.1";
    private readonly string _directory;
    private readonly string _staticRoot;

    public HttpServer(IPAddress ip, ushort port, ILogger logger, string directory, string staticRoot)
        : base(ip, port, logger)
    {
        _directory = directory;
        _staticRoot = staticRoot;
    }

    protected override async Task ProcessRequestAsync(Socket socket)
    {
        try
        {
            var buffer = new byte[MaxReceivedBytes];
            var received = await socket.ReceiveAsync(buffer, SocketFlags.None);
            if (received <= 0)
            {
                return;
            }

            var requestBytes = buffer[0..received];
            var requestText = Encoding.ASCII.GetString(requestBytes);
            Logger.LogInformation("Received request: {Request}", requestText);

            var request = new HttpRequest(requestText);
            var response = HandleRequest(request);
            var responseBytes = Encoding.ASCII.GetBytes(response.ToString());
            await Send(responseBytes, socket);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error processing request");
            try
            {
                var errorResponse = HttpResponce.BadRequest(ServerHttpVersion);
                await Send(Encoding.ASCII.GetBytes(errorResponse.ToString()), socket);
            }
            catch
            {
                // ignored
            }
        }
        finally
        {
            socket.Close();
        }
    }

    protected override Task Send(byte[] response, Socket socket)
    {
        return socket.SendAsync(response, SocketFlags.None);
    }

    private HttpResponce HandleRequest(HttpRequest request)
    {
        if (!string.Equals(request.Method, "GET", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(request.Method, "POST", StringComparison.OrdinalIgnoreCase))
        {
            return HttpResponce.NotImplemented(ServerHttpVersion);
        }

        if (request.RequestUri == null)
        {
            return HttpResponce.BadRequest(ServerHttpVersion);
        }

        if (request.RequestUri == Routes.Base || request.RequestUri == "/index.html")
        {
            return ServeStaticFile("index.html");
        }

        if (request.RequestUri.StartsWith("/style.css", StringComparison.OrdinalIgnoreCase) ||
            request.RequestUri.StartsWith("/app.js", StringComparison.OrdinalIgnoreCase))
        {
            var fileName = request.RequestUri.TrimStart('/');
            return ServeStaticFile(fileName);
        }

        if (request.RequestUri.StartsWith(Routes.Echo, StringComparison.OrdinalIgnoreCase))
        {
            var text = request.RequestUri[Routes.Echo.Length..];
            var decoded = Uri.UnescapeDataString(text);
            var body = decoded ?? string.Empty;
            var headers = HttpHeaders.GetHeaders(HttpHeaders.TextPlain, body.Length);
            return HttpResponce.Ok(ServerHttpVersion, headers, body);
        }

        if (request.RequestUri.StartsWith(Routes.Files, StringComparison.OrdinalIgnoreCase))
        {
            return HandleFiles(request);
        }

        return HttpResponce.NotFound(ServerHttpVersion);
    }

    private HttpResponce ServeStaticFile(string fileName)
    {
        var safeName = SanitizeFileName(fileName);
        if (string.IsNullOrWhiteSpace(safeName))
        {
            return HttpResponce.NotFound(ServerHttpVersion);
        }

        var filePath = Path.Combine(_staticRoot, safeName);
        if (!File.Exists(filePath))
        {
            return HttpResponce.NotFound(ServerHttpVersion);
        }

        var content = File.ReadAllText(filePath);
        var contentType = Path.GetExtension(filePath).ToLowerInvariant() switch
        {
            ".html" => "text/html; charset=utf-8",
            ".css" => "text/css; charset=utf-8",
            ".js" => "application/javascript; charset=utf-8",
            _ => "application/octet-stream"
        };

        var headers = new Dictionary<string, string>
        {
            { HttpHeaders.ContentType, contentType },
            { HttpHeaders.ContentLength, content.Length.ToString() }
        };

        return HttpResponce.Ok(ServerHttpVersion, headers, content);
    }

    private HttpResponce HandleFiles(HttpRequest request)
    {
        if (request.RequestUri == null)
        {
            return HttpResponce.BadRequest(ServerHttpVersion);
        }

        var relativePath = request.RequestUri[Routes.Files.Length..];
        var fileName = SanitizeFileName(relativePath);
        var filePath = Path.Combine(_directory, fileName);

        if (request.IsGet)
        {
            if (!File.Exists(filePath))
            {
                return HttpResponce.NotFound(ServerHttpVersion);
            }

            var fileContents = File.ReadAllText(filePath);
            return HttpResponce.Ok(ServerHttpVersion,
                HttpHeaders.GetHeaders(HttpHeaders.OctetStream, fileContents.Length),
                fileContents);
        }

        if (request.IsPost)
        {
            if (string.IsNullOrWhiteSpace(fileName) || fileName.Contains(Path.DirectorySeparatorChar) || fileName.Contains(Path.AltDirectorySeparatorChar))
            {
                return HttpResponce.BadRequest(ServerHttpVersion);
            }

            if (!fileName.EndsWith(".txt", StringComparison.OrdinalIgnoreCase))
            {
                fileName += ".txt";
            }

            var body = request.Body ?? string.Empty;
            var safePath = Path.Combine(_directory, fileName);
            Directory.CreateDirectory(_directory);
            File.WriteAllText(safePath, body);

            return HttpResponce.Created(ServerHttpVersion,
                HttpHeaders.GetHeaders(HttpHeaders.TextPlain, 0),
                $"Created {fileName}");
        }

        return HttpResponce.NotImplemented(ServerHttpVersion);
    }

    private static string SanitizeFileName(string rawValue)
    {
        if (string.IsNullOrWhiteSpace(rawValue))
        {
            return string.Empty;
        }

        var trimmed = rawValue.Trim();
        trimmed = trimmed.Replace('\\', '/');
        trimmed = Path.GetFileName(trimmed);

        if (string.IsNullOrWhiteSpace(trimmed))
        {
            return string.Empty;
        }

        var invalidChars = Path.GetInvalidFileNameChars();
        foreach (var invalidChar in invalidChars)
        {
            trimmed = trimmed.Replace(invalidChar, '_');
        }

        return trimmed;
    }
}
