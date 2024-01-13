namespace Client

open Bolero
open Bolero.Html

module Components =
    type InputModel =
        { label: string
          value: string }
    type Input () =
        inherit ElmishComponent<InputModel, string> ()

        override this.View model dispatch =
            label {
                attr.``class`` "label"
                model.label
                input {
                    attr.``class`` "text-input"
                    attr.value model.value
                    on.change (fun e -> unbox e.Value |> dispatch)
                }
            }

    type Button () =
        inherit ElmishComponent<string, string> ()

        override this.View text dispatch =
            button {
                attr.``class`` "button"
                text
            }
    
    type Profile () =
        inherit ElmishComponent<User.Model, string> ()

        override this.View user dispatch =
            div {
                p { user.name }
            }
