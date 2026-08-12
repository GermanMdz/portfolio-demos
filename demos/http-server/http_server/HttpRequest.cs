namespace http_server;

internal sealed class HttpRequest : HttpMessage
{
    public string? Method { get; private set; }
    public string? RequestUri { get; private set; }
    public string? HttpVersion { get; private set; }

    public HttpRequest(string rawStringMessage) : base(rawStringMessage)
    {
    }

    protected override void ProcessStartLine(string startLine)
    {
        if (string.IsNullOrWhiteSpace(startLine))
        {
            throw new ArgumentException("Request line cannot be null or whitespace.", nameof(startLine));
        }

        var parts = startLine.Split(' ', 3, StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length < 3)
        {
            throw new FormatException($"Malformed request line: '{startLine}'");
        }

        Method = parts[0];
        RequestUri = parts[1];
        HttpVersion = parts[2];
    }

    public bool IsGet => Method == "GET";
    public bool IsPost => Method == "POST";
}
