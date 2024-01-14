namespace Client

open Option

open Bolero
open Bolero.Html

module Components =
    type InputModel =
        { label: string
          value: string
          error: string option }
    type Input () =
        inherit ElmishComponent<InputModel, string> ()

        override this.View model dispatch =
            label {
                attr.``class`` "label inline-block"
                model.label
                input {
                    attr.``class`` (if isNone model.error then "text-input" else "text-input-error")
                    attr.value model.value
                    on.change (fun e -> dispatch (unbox e.Value))
                }
                p {
                    attr.``class`` "input-error-text"
                    defaultValue "" model.error
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

    type ErrorCard () =
        inherit ElmishComponent<string, unit> ()

        // override this.View err onClose =
        override this.View err dispatch =
            div {
                attr.``class`` "card-error"
                button {
                    attr.``class`` "card-button"
                    on.click (fun e -> dispatch ())
                    "X"
                }
                err
            }
