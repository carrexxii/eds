namespace User

open Fable.Remoting.Client

open Shared

module Services =
    let userService =
        Remoting.createApi ()
        // |> Remoting.withRouteBuilder Route.builder
        |> Remoting.buildProxy<Services.IUser>
