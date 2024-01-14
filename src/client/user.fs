namespace Client

open Elmish
open Bolero.Html
open Bolero.Remoting.Client

open User
open Components

module User =
    let update remote user msg =
        match msg with
        | SetUsername name' -> { user with form = (name', snd user.form) }, Cmd.none
        | SetPassword pw'   -> { user with form = (fst user.form, pw')   }, Cmd.none
        | SubmitLogin ->
            match user.form with
            | "", "" | "", _  | _ , "" ->
                { user with
                    nameError = (fst user.form = "")
                    pwError   = (snd user.form = "") },
                Cmd.none
            | _, _ -> user, Cmd.OfAsync.either remote.signIn user.form RecvLogin ErrorExn
        | RecvLogin res ->
            match res with
            | Ok user'  -> user', Cmd.ofMsg Completed
            | Error err ->
                { user with 
                    nameError = err = IncorrectUsername
                    pwError   = err = IncorrectPassword},
                Cmd.none
        | RecvUser opt ->
            match opt with
            | Some user' -> user', Cmd.ofMsg Completed
            | None -> Model.Default, Cmd.ofMsg Completed
        | GetSession -> printfn "Getting session..."; user, Cmd.OfAuthorized.either remote.getUser () RecvUser ErrorExn
        | ErrorExn err -> failwith $"Encountered exception: {err}"
        | Completed -> failwith "Should be caught by parent"

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
