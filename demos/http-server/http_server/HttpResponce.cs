namespace http_server;

internal sealed class HttpResponce : HttpMessage
{
    public string? HttpVersion { get; private set; }
    public HttpStatusCode? StatusCode { get; private set; }
    public string? ReasonPhrase { get; private set; }

    public HttpResponce(string rawStringMessage) : base(rawStringMessage)
    {
    }

    public HttpResponce(string httpVersion, HttpStatusCode statusCode, Dictionary<string, string>? headers = null, string? body = null)
        : base($"{httpVersion} {(int)statusCode} {HttpStatusCodeExtension.GetHttpStatusCodeName(statusCode)}\r\n")
    {
        HttpVersion = httpVersion;
        StatusCode = statusCode;
        ReasonPhrase = HttpStatusCodeExtension.GetHttpStatusCodeName(statusCode);
        Headers = headers ?? new Dictionary<string, string>();
        Body = body ?? string.Empty;
        StartLine = $"{httpVersion} {(int)statusCode} {ReasonPhrase}";
    }

    protected override void ProcessStartLine(string startLine)
    {
        if (string.IsNullOrWhiteSpace(startLine))
        {
            throw new ArgumentException("Status line cannot be null or whitespace.", nameof(startLine));
        }

        var parts = startLine.Split(' ', 3, StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 3)
        {
            throw new FormatException($"Malformed status line: '{startLine}'");
        }

        HttpVersion = parts[0];
        StatusCode = Enum.TryParse<HttpStatusCode>(parts[1], out var parsed)
            ? parsed
            : throw new FormatException($"Unknown HTTP status: '{parts[1]}'");
        ReasonPhrase = parts[2];
    }

    public static HttpResponce NotImplemented(string httpVersion) => new(httpVersion, HttpStatusCode.NotImplemented);
    public static HttpResponce NotFound(string httpVersion) => new(httpVersion, HttpStatusCode.NotFound);
    public static HttpResponce BadRequest(string httpVersion) => new(httpVersion, HttpStatusCode.BadRequest);
    public static HttpResponce Ok(string httpVersion, Dictionary<string, string>? headers = null, string? body = null) => new(httpVersion, HttpStatusCode.OK, headers, body);
    public static HttpResponce Created(string httpVersion, Dictionary<string, string>? headers = null, string? body = null) => new(httpVersion, HttpStatusCode.Created, headers, body);
}
