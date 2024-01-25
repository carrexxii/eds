namespace Shared

[<AutoOpen>]
module Types =
    type Student = 
        { id: int
          name: string }
        static member Default = 
            { id = -1
              name = "" }
