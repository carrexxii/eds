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
    and UserQuery =
        { id      : int option
          username: string option
          email   : string option }
        static member Default =
            { id       = None
              username = None
              email    = None }

    type IUser = {
            get: UserQuery -> Async<User list>
            set: User      -> Async<Result<unit, string>>
            add: User      -> Async<Result<unit, string>>
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
