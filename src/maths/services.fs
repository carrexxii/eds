namespace EDS.Maths

open Fable.Remoting.Client

open EDS.Shared

module Services =
    let userService =
        Remoting.createApi ()
        // |> Remoting.withRouteBuilder Route.builder
        |> Remoting.buildProxy<Services.IUser>
