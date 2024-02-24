namespace EDS.Shared

open Fable.Remoting.Client

module Services =
    type User =
        { id      : int
          username: string
          email   : string
          password: string }
        static member Default =
            { id       = -1
              username = ""
              email    = ""
              password = "" }

        member this.toStringArray () =
            [| this.id.ToString ()
               this.username
               this.email |]

    type IUser = {
            get    : unit -> Async<User option>
            getMany: int * int -> Async<User array option>
            set    : User -> Async<Result<unit, string>>
            add    : User -> Async<Result<unit, string>>
        }
        with member this.ctx: Microsoft.AspNetCore.Http.HttpContext = null
    let userService =
        Remoting.createApi ()
        |> Remoting.buildProxy<IUser>

    type MathsData =
        | SingleData of int list
        | PairData   of (int * int) list
        member this.single = match this with SingleData data -> data | _ -> failwith "Not single data set"
        member this.pair   = match this with PairData   data -> data | _ -> failwith "Not pair data set"
    type IResource = {
        getProgram  : string -> Async<string array option>
        getMathsData: string -> Async<MathsData option>
    }
    let resourceService =
        Remoting.createApi ()
        |> Remoting.buildProxy<IResource>
