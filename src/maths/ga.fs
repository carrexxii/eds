namespace EDS.Maths

open Feliz
open Feliz.Mafs
open Feliz.Mafs.Text
open SharpGA

module GA =
    let view () =
        Html.div [
            Mafs MafsProps.Default [
                CartesianDefault
            ]
        ]
