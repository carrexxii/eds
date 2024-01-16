namespace Client

open Option

open Elmish
open Bolero.Html
open Bolero.Remoting.Client

open User

module User =
    let init () =
        Model.Default

    let update remote login msg =
        match msg with
        | SetPassword pw'   -> { login with password = pw'   }, Cmd.none
        | SetUsername name' -> { login with name     = name' }, Cmd.none
        | SubmitLogin ->
            match login.name, login.password with
            | "", "" | "", _  | _ , "" ->
                { login with
                    nameError = (login.name     = "")
                    pwError   = (login.password = "") },
                Cmd.none
            | _, _ -> login, Cmd.OfAsync.either remote.signIn login RecvLogin ErrorExn
        | RecvLogin resp ->
            match resp with
            | Ok user   -> login, Cmd.ofMsg (Completed user)
            | Error err ->
                { login with 
                    nameError = err = IncorrectUsername
                    pwError   = err = IncorrectPassword },
                Cmd.none
        | RecvUser login' -> login, Cmd.ofMsg (Completed (defaultValue Model.Default login'))
        | GetSession -> printfn "Getting session..."; login, Cmd.OfAuthorized.either remote.getUser () RecvUser ErrorExn
        | ErrorExn err -> failwith $"Encountered exception: {err}"
        | Completed _ -> failwith "Should be caught by parent"

    let view user dispatch =
        let ifErrorOpt err msg =
            if err then Some msg else None
        form {
            on.submit (fun _ -> dispatch SubmitLogin)
            ecomp<Input, _, _>
                { label = "Username: "; value = ""; error = ifErrorOpt user.nameError "Invalid username" }
                (fun name -> dispatch (SetUsername name))
                { attr.empty () }
            br
            ecomp<Input, _, _>
                { label = "Password: "; value = ""; error = ifErrorOpt user.pwError "Invalid password" }
                (fun pw -> dispatch (SetPassword pw))
                { attr.empty () }
            br
            ecomp<Button, _, _> 
                "Login"
                (fun _ -> dispatch SubmitLogin)
                { attr.empty () }
        }
