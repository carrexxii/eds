namespace EDS.Maths

open Fable.Remoting.Client

open EDS.Shared

module Services =
    let userService =
        Remoting.createApi ()
        |> Remoting.buildProxy<Services.IUser>
