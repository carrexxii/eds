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
    let update remote msg state =
        // printfn $"{msg} -> {state}"
        match msg with
        | SetPage page'     -> { state with page = page' }, Cmd.none

        | ErrorMsg err -> { state with error = Some err }, Cmd.none
        | ErrorExn exn -> { state with error = Some (Exception exn) }, Cmd.none
        | ClearError -> { state with error = None }, Cmd.none

        | UserMsg msg ->
            match msg with
            | User.Message.Completed -> state, Cmd.ofMsg (SetPage Home)
            | _ ->
                let user', msg' = User.update remote (state.user) msg
                {state with user = user'}, Cmd.map UserMsg msg'
        
        | StudentMsg msg ->
            state, Cmd.none

    let router =
        Router.infer SetPage (fun model -> model.page)
        |> Router.withNotFound Page404

    type ProfileTmpl = Template<"wwwroot/profile.html">
    let profileView model dispatch =
        ProfileTmpl()
            .Username(model.user.name)
            .Elt()

    type ErrorTmpl = Template<"wwwroot/error.html">
    let errorView (code: string) (msg: string) =
        ErrorTmpl()
            .Code(code)
            .Msg(msg)
            .Elt()

    let dbTestView state dispatch = 
        p { "asd" }

    let homeView state dispatch =
        ecomp<Profile, _, _>
            state.user
            (fun _ -> ())
            { attr.empty () }

    let view state dispatch =
        let page = 
            match state.page with
            | Home    -> homeView state dispatch
            | Profile -> profileView state dispatch
            | DBTest  -> dbTestView state dispatch
            | Page404 -> errorView "404" "Page not found"
            | Login   ->
                match state.user.kind with 
                | User.Kind.Anonymous -> User.view state.user (UserMsg >> dispatch)
                | _ -> homeView state dispatch
        match state.error with
        | None -> page
        | Some err ->
            concat {
                page
                div {
                    attr.``class`` "card-container"
                    ecomp<ErrorCard, _, _>
                        (err.ToString ())
                        (fun _ -> dispatch ClearError)
                        { attr.empty () }
                }
            }

    type EDS () =
        inherit ProgramComponent<Model, Message> ()

        override this.Program =
            Program.mkProgram (fun _ -> Model.Default, Cmd.batch [ Cmd.ofMsg (UserMsg User.GetSession)
                                                                   Cmd.ofMsg (SetPage Home) ])
                              (update <| this.Remote<Services> ())
                              view
            |> Program.withRouter router
