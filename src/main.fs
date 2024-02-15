namespace EDS.Server

open Falco.Routing
open Falco.HostBuilder
open Fable.Remoting.Server
open Fable.Remoting.AspNetCore
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Http

module Main =
    let remoting context (app: IApplicationBuilder) =
        Remoting.createApi ()
        |> Remoting.fromContext context
        |> app.UseRemoting
        app

    let authService (auth: IServiceCollection) =
        auth.AddAuthentication(fun options ->
            options.DefaultChallengeScheme    <- AuthConfig.scheme
            options.DefaultAuthenticateScheme <- AuthConfig.scheme
            options.DefaultSignInScheme       <- AuthConfig.scheme)
            .AddBearerToken(fun options ->
                options.ClaimsIssuer <- AuthConfig.issuer)
            .AddCookie("Bearer")
        |> ignore
        auth

    [<EntryPoint>]
    let main args =
        webHost [||] {
            add_service authService

            add_antiforgery
            use_compression
            use_static_files

            use_authentication
            use_authorization

            use_middleware (remoting Services.User.User)
            use_middleware (remoting Services.Resource.Resource)

            not_found Pages.notFound
            endpoints [
                get  "/"       <| Pages.index
                get  "/login"  <| Pages.login
                get  "/status" <| Pages.status
                get  "/user"   <| Pages.user
                get  "/maths"  <| Pages.maths
                get  "/csc"    <| Pages.csc
                post "/login"  <| User.login
                post "/logout" <| User.logout
            ]
        }
        0
