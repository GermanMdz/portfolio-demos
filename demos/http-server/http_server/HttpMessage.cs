using System.Text.RegularExpressions;

namespace http_server;

internal abstract class HttpMessage
{
    private const string CrLf = "\r\n";
    private const string AnyCharacter = "[^ ]*";

    public string RawStringMessage { get; }
    protected string StartLine { get; set; } = string.Empty;
    public string? Body { get; protected set; }
    public Dictionary<string, string> Headers { get; protected set; } = new();

    protected HttpMessage(string rawStringMessage)
    {
        if (string.IsNullOrWhiteSpace(rawStringMessage))
        {
            throw new ArgumentException("HTTP message cannot be null or whitespace.", nameof(rawStringMessage));
        }

        RawStringMessage = rawStringMessage;

        string[] messageLines = Regex.IsMatch(rawStringMessage, $@"{CrLf}{AnyCharacter}")
            ? Regex.Split(rawStringMessage, $@"{CrLf}")
            : [rawStringMessage];

        if (messageLines.Length == 0)
        {
            throw new InvalidOperationException("HTTP message should have a start line.");
        }

        StartLine = messageLines[0];
        ProcessStartLine(StartLine);
        ProcessHeaders(messageLines);
        ProcessBody(messageLines);
    }

    protected abstract void ProcessStartLine(string startLine);

    protected void ProcessHeaders(string[] messageLines)
    {
        foreach (var line in messageLines.Skip(1))
        {
            if (string.IsNullOrEmpty(line))
            {
                break;
            }

            if (line.Contains(':'))
            {
                var parts = line.Split(": ", 2, StringSplitOptions.None);
                if (parts.Length == 2)
                {
                    Headers[parts[0]] = parts[1].Trim();
                }
            }
        }
    }

    protected void ProcessBody(string[] messageLines)
    {
        int bodyStart = 1 + Headers.Count;
        var bodyLines = messageLines.Skip(bodyStart).ToArray();
        Body = string.Join("\r\n", bodyLines);
    }

    public override string ToString()
    {
        var headerBlock = string.Join(CrLf, Headers.Select(kvp => $"{kvp.Key}: {kvp.Value}"));
        return $"{StartLine}{CrLf}{headerBlock}{CrLf}{CrLf}{Body ?? string.Empty}";
    }
}
