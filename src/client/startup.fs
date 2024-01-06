namespace Client

open Microsoft.AspNetCore.Components.WebAssembly.Hosting
open Bolero.Remoting.Client

module Program =
    [<EntryPoint>]
    let main args =
        let builder = WebAssemblyHostBuilder.CreateDefault args
        builder.RootComponents.Add<Main.EDS> "#main"
        builder.Services.AddBoleroRemoting builder.HostEnvironment |> ignore
        (builder.Build ()).RunAsync () |> ignore
        0
