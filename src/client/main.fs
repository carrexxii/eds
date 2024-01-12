namespace Client

open Elmish
open Bolero
open Bolero.Html
open Bolero.Templating.Client
open Bolero.Remoting
open Bolero.Remoting.Client

open Main
open Components

module Main =
    let init () =
        ()

    let update remote msg model =
        // printfn $"{msg} -> {model}"
        match msg with
        | SetPage page'     -> { model with page = page' }, Cmd.none
        | SetUsername name' -> { model with username = name' }, Cmd.none
        | SetPassword pw'   -> { model with password = pw' }, Cmd.none

        | SubmitLogin -> model, Cmd.OfAsync.either remote.signIn (model.username, model.password) LoginResult ErrorExn
        | LoginResult result ->
            (match result with
            | None -> { model with signedInAs = Some model.username },
                      SetPage Home |> Cmd.ofMsg
            | Some err -> model,
                          DisplayError err |> Cmd.ofMsg)
        | ClearLoginForm -> { model with username = ""; password = "" }, Cmd.none

        | GetSignedInAs -> model, Cmd.OfAuthorized.either remote.getUsername () RecvSignedInAs ErrorExn
        | RecvSignedInAs name' ->
            { model with
                username   = Option.defaultValue "" name'
                signedInAs = name' },
            Cmd.none

        | DisplayError err -> { model with error = Some err }, Cmd.none
        | ErrorExn exn -> { model with error = Some (exn.ToString ()) }, Cmd.none
        | ClearError -> { model with error = None }, Cmd.none

        | StudentMsg msg ->
            match model.userData with
            // | Student studentModel ->
                // let data, msg = Student.update remote msg studentModel
                // { model with userData = Student data }, Cmd.map StudentMsg msg
            | Anonymous ->
                let msg = Student.update remote msg
                model, Cmd.map StudentMsg msg
            | _ -> model, Cmd.none

    let router =
        Router.infer SetPage (fun model -> model.page)
        |> Router.withNotFound Page404

    type LoginTmpl = Template<"wwwroot/login.html">
    let loginView model dispatch =
        form {
            on.submit (fun _ -> SubmitLogin |> dispatch)
            ecomp<Input, _, _>
                { label = "Username: "; value = model.username }
                (fun name -> SetUsername name |> dispatch)
                { attr.empty () }
            ecomp<Input, _, _>
                { label = "Password: "; value = model.password }
                (fun pw -> SetPassword pw |> dispatch)
                { attr.empty () }
            ecomp<Button, _, _>
                "Login"
                (fun _ -> SubmitLogin |> dispatch)
                { attr.empty () }
        }

    type ProfileTmpl = Template<"wwwroot/profile.html">
    let profileView model dispatch =
        match model.signedInAs with
        | None ->
            // SetPage Login |> dispatch
            loginView model dispatch
        | Some name ->
            ProfileTmpl()
                .Username(name)
                .Elt()

    type ErrorTmpl = Template<"wwwroot/error.html">
    let errorView (code: string) (msg: string) =
        ErrorTmpl()
            .Code(code)
            .Msg(msg)
            .Elt()

    let dbTestView model dispatch = 
        p { "asd" }

    let view model dispatch =
        match model.page with
        | Home    -> p { $"Home Page (singnedInAs: {model.signedInAs})" }
        | Profile -> profileView model dispatch
        | DBTest  -> dbTestView model dispatch
        | Login   -> loginView model dispatch
        | Page404 -> errorView "404" "Page not found"

    type EDS () =
        inherit ProgramComponent<Model, Message> ()

        override this.Program =
            Program.mkProgram (fun _ -> Model.Default, Cmd.ofMsg GetSignedInAs)
                              (update <| this.Remote<Services> ())
                              view
            |> Program.withRouter router
#if DEBUG
            |> Program.withHotReload
#endif
