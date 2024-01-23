namespace Server

open Falco
open Falco.Routing
open Falco.HostBuilder
open Microsoft.Extensions.Hosting

module Main =
    let config = configuration [||] {
        base_path $"{__SOURCE_DIRECTORY__}/.."
        required_json "appsettings.json"
    }

    let configHost (host: IHostBuilder) =
        host

    [<EntryPoint>]
    let main args =
        webHost [||] {
            host configHost
            add_antiforgery
            // use_caching
            use_compression
            use_static_files
            // use_authorization
            // use_hsts
            // use_https
            not_found Pages.notFound
            endpoints [
                get  "/"      <| Pages.index
                get  "/login" <| Pages.login
                post "/login" <| User.login
            ]
        }
        0
