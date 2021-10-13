namespace GridInterview.Modules

open System

module Matrix =
    let private r = Random()
    let mutable private matrix: Int32 [,] = null

    let generateMatrix size =
        printfn "Generating a matrix of  %d" size 
        matrix <- Array2D.init size size (fun _ _ -> r.Next(2))
        matrix

    let private isCellInBounds x y =
        x >= 0
        && y >= 0
        && x < matrix.GetLength(0)
        && y < matrix.GetLength(1)

    let private isCellFilled cell =
        let (x, y) = cell
        isCellInBounds x y && matrix.[x, y] = 1

    let private getNeighbours cell =
        let (x, y) = cell

        [| (x - 1, y)
           (x, y - 1)
           (x + 1, y)
           (x, y + 1) |]
        |> Array.filter isCellFilled

    let private getAllNeighbours cells =
        cells
        |> Array.collect getNeighbours
        |> Array.distinct

    let rec private getGroupRecursive cells =
        let neighbours = getAllNeighbours cells

        let delta =
            neighbours
            |> Array.filter (fun cell -> Array.exists ((=) cell) cells |> not)
            |> Array.filter isCellFilled 

        if delta.Length = 0 then
            cells
        else
            Array.concat [| cells; delta |]
            |> getGroupRecursive

    let getGroup x y =
        if matrix.[x, y] = 0 then
            Array.empty
        else
            getGroupRecursive [| (x, y) |]
            |> Array.distinct
            |> Array.map (fun cell -> [| fst cell; snd cell |])
