using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

[assembly : LambdaSerializer (typeof (Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace AwsDotnetCsharp {
  public class Handler {
    public APIGatewayProxyResponse Hello (APIGatewayProxyRequest request, ILambdaContext context) 
    {
      // Log entries show up in CloudWatch
      var output = string.Format("RequestHeader:{0}, RequestBody:{1}\n",request.Headers.Select(kvp=>kvp.ToString()).Aggregate((k,v)=>k+","+v), request.Body);
      context.Logger.LogLine(output);

      var response = new APIGatewayProxyResponse {
        StatusCode = (int) HttpStatusCode.OK,
        Body = "{ \"Message\": \"Process done with :"+output+"\" }",
        Headers = new Dictionary<string, string> { { "Content-Type", "application/json" } }
      };

      return response;
    }
  }
}