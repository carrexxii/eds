namespace User

// open Elmish
// open Feliz
// open Feliz.UseElmish

// open Components

// module User =
//     type Model =
//         { name    : string
//           password: string }
//         static member Default =
//             { name     = ""
//               password = "" }

//     type Message =
//         | SetName     of string
//         | SetPassword of string
//         | SubmitLogin
//         // | SetError    of string option
//         | Completed of Model

//     let init () =
//         Model.Default, Cmd.none
    
//     let update msg state =
//         match msg with
//         | SetName     name     -> { state with name     = name     }, Cmd.none
//         | SetPassword password -> { state with password = password }, Cmd.none
//         | SubmitLogin -> state, Cmd.none
//         // | SetError err  -> { state with error = err }, Cmd.none
//         | Completed model -> failwith "Parent should have caught this"

//     [<ReactComponent>]
//     let view state dispatch =
//         Html.form [
//             prop.onSubmit (fun e -> dispatch SubmitLogin)
//             prop.children [
//                 textInput "Name:"     state.name     (fun txt -> dispatch (SetName     txt)) None
//                 textInput "Password:" state.password (fun txt -> dispatch (SetPassword txt)) None
//             ]
//         ]

// open Option

// open Elmish

// open User

// module User =
//     let init () =
//         Model.Default

//     let update remote login msg =
//         match msg with
//         | SetPassword pw'   -> { login with password = pw'   }, Cmd.none
//         | SetUsername name' -> { login with name     = name' }, Cmd.none
//         | SubmitLogin ->
//             match login.name, login.password with
//             | "", "" | "", _  | _ , "" ->
//                 { login with
//                     nameError = (login.name     = "")
//                     pwError   = (login.password = "") },
//                 Cmd.none
//             | _, _ -> login, Cmd.OfAsync.either remote.signIn login RecvLogin ErrorExn
//         | RecvLogin resp ->
//             match resp with
//             | Ok user   -> login, Cmd.ofMsg (Completed user)
//             | Error err ->
//                 { login with 
//                     nameError = err = IncorrectUsername
//                     pwError   = err = IncorrectPassword },
//                 Cmd.none
//         | RecvUser login' -> login, Cmd.ofMsg (Completed (defaultValue Model.Default login'))
//         // | GetSession -> printfn "Getting session..."; login, Cmd.OfAuthorized.either remote.getUser () RecvUser ErrorExn
//         | ErrorExn err -> failwith $"Encountered exception: {err}"
//         | Completed _ -> failwith "Should be caught by parent"

//     let view user dispatch =
//         let ifErrorOpt err msg =
//             if err then Some msg else None
//         ()
//         form {
//             on.submit (fun _ -> dispatch SubmitLogin)
//             ecomp<Input, _, _>
//                 { InputModel.Default with
//                     label = "Username: "
//                     value = "" }
//                 (fun name -> dispatch (SetUsername name))
//                 { attr.empty () }
//             ecomp<Input, _, _>
//                 { InputModel.Default with
//                     label = "Password: "
//                     value = "" }
//                 (fun pw -> dispatch (SetPassword pw))
//                 { attr.empty () }
//             ecomp<Button, _, _> 
//                 "Login"
//                 (fun _ -> dispatch SubmitLogin)
//                 { attr.empty () }
//         }
