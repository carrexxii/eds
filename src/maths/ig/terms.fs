namespace EDS.Maths.IG

open Feliz

open EDS.Shared.Components

module Terms =
    let higherDim =
        Popup "higher-dimensional" (Html.text
            """For example, it is standard to do 3D graphics using
               4D vectors. Without the extra dimension, certain
               transformations are much more difficult.""")

    let scalar =
        Popup "scalar" (Html.text
            """A scalar is a one-dimensional value that measures how
               big/how much/etc. Scalars do not have any sort of
               directional component to them. Some examples of scalar
               measurements are: time, mass and distance.
               Many scalar values have a vector equivalent.""")

    let [<Literal>] Syllabus = @"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"
    let section1 = Link "\"Number\" (Section 1)"                      $"{Syllabus}#page=12"
    let section2 = Link "\"Algebra and Graphs\" (Section 2)"          $"{Syllabus}#page=16"
    let section3 = Link "\"Coordinate Geometry\" (Section 3)"         $"{Syllabus}#page=22"
    let section4 = Link "\"Geometry\" (Section 4)"                    $"{Syllabus}#page=24"
    let section5 = Link "\"Mensuration\" (Section 5)"                 $"{Syllabus}#page=28"
    let section6 = Link "\"Trigonometry\" (Section 6)"                $"{Syllabus}#page=30"
    let section7 = Link "\"Vectors and transformations\" (Section 7)" $"{Syllabus}#page=32"
    let section8 = Link "\"Probability\" (Section 8)"                 $"{Syllabus}#page=34"
    let section9 = Link "\"Statistics\" (Section 9)"                  $"{Syllabus}#page=36"
