namespace Client

open Elmish
open Bolero.Html

open User
open Components

module User =
    let update remote model msg =
        match msg with
        | SetUsername name' -> { model with form = (name', snd model.form) }, Cmd.none
        | SetPassword pw'   -> { model with form = (fst model.form, pw')   }, Cmd.none
        | SubmitLogin -> model, Cmd.OfAsync.either remote.signIn model.form RecvLogin ErrorMsg
        | RecvLogin res ->
            match res with
            | Ok name' -> { model with name = name' },
                          Cmd.ofMsg (Completed <| Ok model)
            | Error err -> model, Cmd.ofMsg (Completed <| Error err)
    
    let view model dispatch =
        form {
            on.submit (fun _ -> dispatch SubmitLogin)
            ecomp<Input, _, _>
                { label = "Username: "; value = fst model.form }
                (fun name -> dispatch (SetUsername name))
                { attr.empty () }
            ecomp<Input, _, _>
                { label = "Password: "; value = snd model.form }
                (fun pw -> dispatch (SetPassword pw))
                { attr.empty () }
            ecomp<Button, _, _>
                "Login"
                (fun _ -> dispatch SubmitLogin)
                { attr.empty () }
        }
