using Grpc.Core;
using GreeterGrpc;

namespace GreeterGrpc.Services;

public class GreeterService : Greeter.GreeterBase
{
    private readonly ILogger<GreeterService> _log;
    public GreeterService(ILogger<GreeterService> logger)
    {
        _log = logger;
    }

    public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
    {
        _log.LogInformation($"Received HelloRequest: {request.Name}");
        
        var reply = new HelloReply
        {
            Message = "Hello " + request.Name
        };
        return Task.FromResult(reply);
    }
}
