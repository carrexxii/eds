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
            | "", _
            | _, "" -> user, Cmd.ofMsg (ErrorMsg $"Both fields need to be filled in, got: name: {fst user.form}; pw: {snd user.form}")
            | _, _ -> user, Cmd.OfAsync.either remote.signIn user.form RecvLogin ErrorExn
        | ClearForm -> { user with form = ("", "") }, Cmd.none
        | RecvLogin res ->
            match res with
            | Ok user' -> user', Cmd.none
            | Error err -> user, Cmd.ofMsg (ErrorMsg err)
        | RecvUser opt ->
            match opt with
            | Some user' -> user', Cmd.ofMsg Completed
            | None -> Model.Default, Cmd.ofMsg Completed
        | GetSession -> printfn "Getting session..."; user, Cmd.OfAuthorized.either remote.getUser () RecvUser ErrorExn
        | ErrorMsg err -> failwith $"Error message: {err}"
        | ErrorExn err -> failwith $"Encountered exception: {err}"
        | Completed -> failwith "Should be caught by parent"

    let view dispatch =
        form {
            on.submit (fun _ -> dispatch SubmitLogin)
            ecomp<Input, _, _>
                { label = "Username: "; value = "" }
                (fun name -> dispatch (SetUsername name))
                { attr.empty () }
            ecomp<Input, _, _>
                { label = "Password: "; value = "" }
                (fun pw -> dispatch (SetPassword pw))
                { attr.empty () }
            ecomp<Button, _, _> 
                "Login"
                (fun _ -> dispatch SubmitLogin)
                { attr.empty () }
        }
