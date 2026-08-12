using System.Net;
using System.Net.Sockets;
using Microsoft.Extensions.Logging;

namespace http_server;

internal abstract class TcpServer
{
    public IPAddress Ip { get; }
    public ushort Port { get; }
    public ILogger Logger { get; }
    protected int MaxReceivedBytes { get; set; }
    public bool ShouldStop { get; private set; }

    protected TcpServer(IPAddress ip, ushort port, ILogger logger)
    {
        Ip = ip;
        Port = port;
        Logger = logger;
        MaxReceivedBytes = 16384;
    }

    public void Start()
    {
        var server = new TcpListener(Ip, Port);
        server.Start();
        Logger.LogInformation("Started server on {Ip}:{Port}", Ip, Port);

        while (!ShouldStop)
        {
            Socket socket = server.AcceptSocket();
            _ = Task.Run(async () => await ProcessRequestAsync(socket));
        }
    }

    public void Stop()
    {
        ShouldStop = true;
    }

    protected abstract Task ProcessRequestAsync(Socket socket);
    protected abstract Task Send(byte[] response, Socket socket);
}
