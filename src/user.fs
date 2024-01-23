namespace Server

open Falco

type User =
    { id      : int
      name    : string
      password: string }

module User =
    let login: HttpHandler =
        Request.mapFormSecure
            (fun form ->
                { id       = -1
                  name     = form.GetString ("name", "name")
                  password = form.GetString ("password", "password")})
            Response.ofJson
            (Response.withStatusCode 400 >> Response.ofEmpty)
