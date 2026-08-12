using System.Reflection;

namespace http_server;

[AttributeUsage(AttributeTargets.Field)]
public sealed class HttpStatusCodeAttribute(string statusCode) : Attribute
{
    public string StatusCode { get; } = statusCode;
}

public enum HttpStatusCode
{
    [HttpStatusCode("OK")]
    OK = 200,

    [HttpStatusCode("Created")]
    Created = 201,

    [HttpStatusCode("Not Found")]
    NotFound = 404,

    [HttpStatusCode("Bad Request")]
    BadRequest = 400,

    [HttpStatusCode("Not Implemented")]
    NotImplemented = 501
}

public static class HttpStatusCodeExtension
{
    public static string GetHttpStatusCodeName(HttpStatusCode statusCode)
    {
        var fieldInfo = typeof(HttpStatusCode).GetField(statusCode.ToString());
        var attribute = fieldInfo?.GetCustomAttribute<HttpStatusCodeAttribute>();
        return attribute?.StatusCode ?? statusCode.ToString();
    }
}
