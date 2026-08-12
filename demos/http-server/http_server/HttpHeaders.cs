namespace http_server;

internal static class HttpHeaders
{
    public const string ContentType = "Content-Type";
    public const string ContentLength = "Content-Length";
    public const string UserAgent = "User-Agent";
    public const string Host = "Host";

    public const string TextPlain = "text/plain";
    public const string OctetStream = "application/octet-stream";

    public static Dictionary<string, string> GetHeaders(string contentTypeValue, int bodyLength)
    {
        return new Dictionary<string, string>
        {
            { ContentType, contentTypeValue },
            { ContentLength, bodyLength.ToString() }
        };
    }
}
