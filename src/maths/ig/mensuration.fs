namespace EDS.Maths.IG

open System

open Fable.Core.JsInterop
open Feliz
open Feliz.Mafs

open EDS.Shared
open EDS.Shared.Components

module Mensuration =
// Answers may be asked for in multiples of π.
// Core:
    // 1 Use current units of mass, length, area, volume
    // and capacity in practical situations and express
    // quantities in terms of larger or smaller units
        // Convert between units including units of area
        // and volume.
    // 2 Carry out calculations involving the perimeter
    // and area of a rectangle, triangle, parallelogram
    // and trapezium and compound shapes derived
    // from these.
    // 3 Carry out calculations involving the surface area
    // and volume of a cuboid, prism and cylinder.
        // Where the sector angle is a factor of 360.
    // 4 Carry out calculations involving the surface area
    // and volume of a sphere, pyramid and cone.
        // Formulae will be given for the surface area and
        // volume of the sphere, pyramid and cone in the
        // question.
    // 5 Carry out calculations involving the areas and
    // volumes of compound shapes.
    let Units () =
        Html.div [
            prop.className "flex flex-col"
            prop.children [
                Html.div [
                    Article [
                        Heading "Units"
                        Html.p $"""When applying maths to real-life problems, numbers should be given some meaning/context.
                                    We call the context given to a number its """
                        Popup "Unit" Medium (Html.text "The meaning or context of a number, such as 1 kg, 5 cm or 10 m/s")
                        Html.p """. The two main types of units are:"""
                        Note Extra """The metric system is the primary one around the world today and will be the one we focus on.
                                      For real-life situations, however, it can be useful to know the approximate values for some imperial units."""
                        OrderedList
                            [ "Metric units (or SI units) such as meters and kilograms."
                              "Imperial units (use in the USA) such as feet and inches." ]
                        Html.p """The main units you will come across are:"""
                        Note Info "The letters in [brackets] are the abbreviations that will be used for telling the units for equations."
                        UnorderedList
                            [ Html.text "Meters [m]"; Html.text "Kilograms [kg]"; Html.text "Seconds [s]" ]
                        Html.p """Units can also be combined together to make more units. For example, you probably know that speed
                                   can be measured in kilometers per hour (km/h). This is a combination of distance (km) and time (h)."""
                        Accordion [ Html.text "Extended",
                            Html.text """

                            """
                        ]
                    ]
                ]
                Html.div [

                ]
            ]
        ]

    let Calculations () =
        Html.div [
            Html.text "Calculations"
        ]

    let tabs =
        [ "Units"                     , Units ()
          "Perimeter, Area and Volume", Calculations () ]

    let view tab =
        Tabbed tab tabs
