namespace User

open Elmish
open Elmish.React
open Feliz
open Feliz.Router
open Feliz.ReactApi
open Feliz.UseElmish
open Fable.Core
open Fable.Core.JsInterop
open Browser.Dom
open Browser

open Shared
open Components

type Error =
    | IncorrectUsername
    | IncorrectPassword
    | PageNotFound
    | AccessDenied
    | Warning   of string
    | Fatal     of string
    | Exception of exn
    with
    override this.ToString () =
        match this with
        | IncorrectUsername -> "Incorrect Username"
        | IncorrectPassword -> "Incorrect Password"
        | Warning str       -> $"Warning: {str}"
        | Fatal str         -> $"Fatal Error: {str}"
        | Exception e       -> $"Exception: {e}"

module Main =
    type Model =
        { url  : string list
          user : Services.User
        //   dash : Dashboard.Model
          error: Error option }
        static member Default =
            { url   = []
              user  = Services.User.Default
            //   dash  = Dashboard.Model.Default
              error = None }

    type Message =
        | SetUrl   of string list
        | GetUser
        | RecvUser of Services.User
        | ErrorMsg of Error
        | ErrorExn of exn
        | ClearError

        // | DashMsg of Dashboard.Message

    let init () = 
        { Model.Default with 
            url = Router.currentUrl () },
        Cmd.ofMsg GetUser
    
    let update msg state =
        printf "%A -> %A" msg state
        match msg with
        | SetUrl url -> { state with url = url }, Cmd.none
        | GetUser -> state, Cmd.OfAsync.perform Services.userService.getUser () RecvUser
        | RecvUser user -> { state with user = user }, Cmd.none

        // | UserMsg msg ->
        //     match msg with
        //     | User.Message.Completed user' -> { state with user = user' }, Cmd.none
        //     | _ -> let user, msg = User.update msg state.user
        //            { state with user = user }, Cmd.map UserMsg msg

    let view state dispatch =
        let sidebar = 
            SidebarButtons
                [ "user-icon"    , "Profile" , Router.format "/"
                  "settings-icon", "Settings", Router.format "/settings"
                  "info-icon"    , "About"   , Router.format "/about"
                  "question-icon", "Help"    , Router.format "/help" ]
        let page = 
            match state.url with
            | [] -> Html.div [
                    sidebar "/"
                    Html.p $"Profile page ~> /"
                ]
            | "settings"::url -> Html.div [
                    sidebar "/settings"
                    Html.p $"Settings page ~> {url}"
                ]
            | "about"::url -> Html.div [
                    sidebar "/about"
                    Html.p $"About page ~> {url}"
                ]
            | "help"::url -> Html.div [
                    sidebar "/help"
                    Html.p $"Help page ~> {url}"
                ]
            | url -> Html.p (sprintf "Page not found: %A" url)
        
        React.router [
            router.onUrlChanged (SetUrl >> dispatch)
            router.children page
        ]

    [<EntryPoint>]
    let main args =
        Program.mkProgram init update view
        |> Program.withReactSynchronous "root"
        |> Program.run
        0

// module Main =
//     let init () =
//         let user = User.init ()
//         { Model.Default with
//             user = user
//             dash = Dashboard.init user } 

//     let update remote msg state =
//         // printfn $"{msg} -> {state}"
//         match msg with
//         | SetPage page' -> { state with page = page' }, Cmd.none

//         | ErrorMsg err -> { state with error = Some err }, Cmd.none
//         | ErrorExn exn -> { state with error = Some (Exception exn) }, Cmd.none
//         | ClearError -> { state with error = None }, Cmd.none

//         | UserMsg msg ->
//             match msg with
//             | User.Message.Completed user' -> { state with user = user' }, Cmd.none
//             | _ ->
//                 let login', msg' = User.update remote state.login msg
//                 { state with login = login' }, Cmd.map UserMsg msg'
        
//         | DashMsg msg ->
//             match msg with
//             | Dashboard.Message.Completed -> state, Cmd.none
//             | _ ->
//                 let dash', msg' = Dashboard.update remote state.dash msg
//                 { state with dash = dash' }, Cmd.map DashMsg msg'

//         // | StudentMsg msg ->
//         //     match msg with
//         //     | Student.Message.Completed -> state, Cmd.ofMsg (SetPage Page.Home)
//         //     | _ ->
//         //         let student', msg' = Student.update remote state.user.kind msg
//         //         { state with state.user.kind = User.Student student' }, Cmd.none

//     let router =
//         Router.infer SetPage (fun model -> model.page)
//         |> Router.withNotFound Page.Error

//     // type ProfileTmpl = Template<"wwwroot/profile.html">
//     // let profileView model dispatch =
//     //     ProfileTmpl()
//     //         .Username(model.user.name)
//     //         .Elt()

//     type ErrorTmpl = Template<"wwwroot/error.html">
//     let errorView (code: string) (msg: string) =
//         ErrorTmpl()
//             .Code(code)
//             .Msg(msg)
//             .Elt()

//     let homeView state dispatch =
//         ecomp<Profile, _, _>
//             state.user
//             (fun _ -> ())
//             { attr.empty () }

//     let view state dispatch =
//         let page = 
//             match state.page with
//             | Page.Home -> homeView state dispatch
//             | Page.Dashboard page ->
//                 match state.user.kind with
//                 | User.Anonymous -> errorView "501" "Access denied"
//                 | _ -> Dashboard.view page state.dash (DashMsg >> dispatch)
//             | Page.Error -> errorView "404" "Not found"
//             | Page.Login ->
//                 let dispatch = (UserMsg >> dispatch)
//                 match state.user.kind with 
//                 | User.Kind.Anonymous -> User.view state.login dispatch
//                 | _ -> User.view state.login dispatch
//             // | Page.Logout ->
//         match state.error with
//         | None -> page
//         | Some err ->
//             concat {
//                 page
//                 div {
//                     attr.``class`` "card-container"
//                     ecomp<ErrorCard, _, _>
//                         (err.ToString ())
//                         (fun _ -> dispatch ClearError)
//                         { attr.empty () }
//                 }
//             }

//     type EDS () =
//         inherit ProgramComponent<Model, Message> ()

//         override this.Program =
//             Program.mkProgram (fun _ -> init (), Cmd.ofMsg (UserMsg User.GetSession))
//                               (update <| this.Remote<Services> ())
//                               view
//             |> Program.withRouter router

//     [<EntryPoint>]
//     let main args =
//         let root = ReactDOM.createRoot (document.getElementById "main")
//         root.render (Counter ())
//         0
