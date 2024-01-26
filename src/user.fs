namespace Server

open Falco
open Microsoft.AspNetCore.Authentication

type User =
    { id      : int
      name    : string
      password: string }

module User =
    let login: HttpHandler =
        let tryLogin user =
            match user with
            | { name = "qwe"; password = "asd" } ->
                let userPrincipal = Claims.userPrincipal (Claims.userIdentity user.id user.name)
                // let options = AuthenticationProperties()
                // options.IsPersistent <- true
                // Response.signInOptionsAndRedirect AuthConfig.scheme userPrincipal options "/status"
                Response.signInAndRedirect AuthConfig.scheme userPrincipal "/status"
            | _ -> Response.redirectPermanently "/status"

        Request.mapFormSecure
            (fun form ->
                { id       = -1
                  name     = form.GetString ("name", "name")
                  password = form.GetString ("password", "password")})
            tryLogin
            (Response.withStatusCode 400 >> Response.ofEmpty)

    let logout: HttpHandler =
        Response.signOutAndRedirect AuthConfig.scheme "/status"
