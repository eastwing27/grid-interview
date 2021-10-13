namespace GridInterview.Controllers

//open Matrix
open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open Microsoft.AspNetCore.Cors
open Microsoft.Extensions.Logging
open GridInterview.Modules.Matrix
open Newtonsoft.Json

[<ApiController>]
[<Route("[controller]")>]
type MatrixController (logger: ILogger<MatrixController>) = 
    inherit ControllerBase()

    [<HttpGet>]
    [<Route("{size}")>]
    member _.Get(size) =
        generateMatrix size |> JsonConvert.SerializeObject
        
    [<HttpGet>]
    [<Route("group/{x}/{y}")>]
    member _.GetGroup(x,y) =
        getGroup x y |> JsonConvert.SerializeObject