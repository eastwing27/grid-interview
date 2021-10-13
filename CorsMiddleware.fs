open Microsoft.AspNetCore.Http;
open System.Threading.Tasks;

type CorsMiddleware(nextReq: RequestDelegate) = 
    let _next = nextReq

    member InvokeAsync (context: HttpContext): Task = async {
        context.Response
    }
