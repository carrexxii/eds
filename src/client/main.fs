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
        let user = User.init ()
        { Model.Default with
            user = user
            dash = Dashboard.init user } 

    let update remote msg state =
        // printfn $"{msg} -> {state}"
        match msg with
        | SetPage page' -> { state with page = page' }, Cmd.none

        | ErrorMsg err -> { state with error = Some err }, Cmd.none
        | ErrorExn exn -> { state with error = Some (Exception exn) }, Cmd.none
        | ClearError -> { state with error = None }, Cmd.none

        | UserMsg msg ->
            match msg with
            | User.Message.Completed user' -> { state with user = user' }, Cmd.none
            | _ ->
                let login', msg' = User.update remote state.login msg
                { state with login = login' }, Cmd.map UserMsg msg'
        
        | DashMsg msg ->
            match msg with
            | Dashboard.Message.Completed -> state, Cmd.none
            | _ ->
                let dash', msg' = Dashboard.update remote state.dash msg
                { state with dash = dash' }, Cmd.map DashMsg msg'

        // | StudentMsg msg ->
        //     match msg with
        //     | Student.Message.Completed -> state, Cmd.ofMsg (SetPage Page.Home)
        //     | _ ->
        //         let student', msg' = Student.update remote state.user.kind msg
        //         { state with state.user.kind = User.Student student' }, Cmd.none

    let router =
        Router.infer SetPage (fun model -> model.page)
        |> Router.withNotFound Page.Error

    // type ProfileTmpl = Template<"wwwroot/profile.html">
    // let profileView model dispatch =
    //     ProfileTmpl()
    //         .Username(model.user.name)
    //         .Elt()

    type ErrorTmpl = Template<"wwwroot/error.html">
    let errorView (code: string) (msg: string) =
        ErrorTmpl()
            .Code(code)
            .Msg(msg)
            .Elt()

    let homeView state dispatch =
        ecomp<Profile, _, _>
            state.user
            (fun _ -> ())
            { attr.empty () }

    let view state dispatch =
        let page = 
            match state.page with
            | Page.Home -> homeView state dispatch
            | Page.Dashboard page ->
                match state.user.kind with
                | User.Anonymous -> errorView "501" "Access denied"
                | _ -> Dashboard.view page state.dash (DashMsg >> dispatch)
            | Page.Error -> errorView "404" "Not found"
            | Page.Login ->
                let dispatch = (UserMsg >> dispatch)
                match state.user.kind with 
                | User.Kind.Anonymous -> User.view state.login dispatch
                | _ -> User.view state.login dispatch
            // | Page.Logout ->
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
            Program.mkProgram (fun _ -> init (), Cmd.ofMsg (UserMsg User.GetSession))
                              (update <| this.Remote<Services> ())
                              view
            |> Program.withRouter router
