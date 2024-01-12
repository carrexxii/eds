namespace Client

open Elmish
open Bolero
open Bolero.Html
open Bolero.Templating.Client
open Bolero.Remoting
open Bolero.Remoting.Client

open Main

module Main =
    let init () =
        ()

    let update remote msg model =
        // printfn $"{msg} -> {model}"
        match msg with
        | SetPage page'     -> { model with page = page' }, Cmd.none

        // | SubmitLogin -> model, Cmd.OfAsync.either remote.signIn (model.username, model.password) LoginResult ErrorExn
        // | LoginResult result ->
        //     (match result with
        //     | None -> { model with signedInAs = Some model.username },
        //               Cmd.ofMsg <| SetPage Home
        //     | Some err -> model,
        //                   DisplayError err |> Cmd.ofMsg)
        // | ClearLoginForm -> { model with username = ""; password = "" }, Cmd.none

        // | GetSignedInAs -> model, Cmd.OfAuthorized.either remote.getUsername () RecvSignedInAs ErrorExn
        // | RecvSignedInAs name' ->
        //     { model with
        //         username   = Option.defaultValue "" name'
        //         signedInAs = name' },
        //     Cmd.none

        // | DisplayError err -> { model with error = Some err }, Cmd.none
        | ErrorExn exn -> { model with error = Some (exn.ToString ()) }, Cmd.none
        | ClearError -> { model with error = None }, Cmd.none

        | UserMsg msg ->
            match msg with
            | User.Message.Completed res ->
                match res with
                | Ok res -> { model with user = Some res },
                            Cmd.ofMsg (SetPage Home)
                | Error msg -> { model with user = None },
                               Cmd.ofMsg (ErrorMsg msg)
            | _ -> model, Cmd.map UserMsg (Cmd.ofMsg msg)

        | StudentMsg msg ->
            match model.user with
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

    type ProfileTmpl = Template<"wwwroot/profile.html">
    let profileView model dispatch =
        match model.user with
        | None ->
            dispatch (SetPage Page404)
            empty ()
        | Some user ->
            ProfileTmpl()
                .Username(user.name)
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
        | Home    -> p { $"Home Page (singnedInAs: {model.user})" }
        | Profile -> profileView model dispatch
        | DBTest  -> dbTestView model dispatch
        | Page404 -> errorView "404" "Page not found"
        | Login   ->
            match model.user with
            | None ->
                dispatch (SetPage Page404)
                empty ()
            | Some user -> User.view user (UserMsg >> dispatch)

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
