namespace Shared

// module Route =
//     let builder type' method =
        // sprintf "/api/%s/%s" type' method

module Services =
    type User =
        { name    : string
          password: string }
        static member Default =
            { name     = ""
              password = "" }
    type IUser =
        { getUser: unit -> Async<User> }
        with member this.ctx: Microsoft.AspNetCore.Http.HttpContext = null
