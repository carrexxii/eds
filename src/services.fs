namespace EDS.Server

open Microsoft.AspNetCore.Http

open EDS.Shared

module Services =
    let User: HttpContext -> Services.IUser =
        fun (ctx: HttpContext) ->
            { getUser = fun () -> async {
                return { name     = ctx.User.Identity.Name
                         password = "1234ezez" }
              } }