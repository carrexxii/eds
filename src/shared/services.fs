namespace EDS.Shared

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
