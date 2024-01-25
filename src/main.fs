namespace Server

open Falco.Routing
open Falco.HostBuilder
open Fable.Remoting.Server
open Fable.Remoting.AspNetCore
open Microsoft.Extensions.DependencyInjection
open Microsoft.AspNetCore.Builder

module Main =
    let config = configuration [||] {
        base_path $"{__SOURCE_DIRECTORY__}/.."
        required_json "appsettings.json"
    }

    let remoting (app: IApplicationBuilder) = 
        Remoting.createApi ()
        |> Remoting.fromValue Services.student
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
            use_middleware remoting

            add_antiforgery
            use_compression
            use_static_files

            use_authentication
            use_authorization

            not_found Pages.notFound
            endpoints [
                get  "/"       <| Pages.index
                get  "/login"  <| Pages.login
                get  "/status" <| Pages.status
                post "/login"  <| User.login
                post "/logout" <| User.logout
            ]
        }
        0
