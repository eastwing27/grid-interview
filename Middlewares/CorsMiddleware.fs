namespace GridInterview.Middlewares

open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Primitives
open System.Threading.Tasks

type CorsMiddleware(next: RequestDelegate) = 
    let _next = next

    member _.InvokeAsync (context: HttpContext): Task = 
        context.Response.Headers.Add("Access-Control-Allow-Origin", StringValues("*"))
        _next.Invoke(context)
    
