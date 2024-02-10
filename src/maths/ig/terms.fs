namespace EDS.Maths.IG

open Feliz

open EDS.Shared.Components

module Terms =
    let higherDim =
        Popup "higher-dimensional" Medium (Html.text
            """For example, it is standard to do 3D graphics using
               4D vectors. Without the extra dimension, certain
               transformations are much more difficult.""")

    let scalar =
        Popup "scalar" Medium (Html.text
            """A scalar is a one-dimensional value that measures how
               big/how much/etc. Scalars do not have any sort of
               directional component to them. Some examples of scalar
               measurements are: time, mass and distance.
               Many scalar values have a vector equivalent.""")
