import { Link, PopupSize, Popup } from "../shared/components.js";

export const higherDim = Popup("higher-dimensional", new PopupSize(1, []), (() => {
    const value = "For example, it is standard to do 3D graphics using\n               4D vectors. Without the extra dimension, certain\n               transformations are much more difficult.";
    return value;
})());

export const scalar = Popup("scalar", new PopupSize(1, []), (() => {
    const value = "A scalar is a one-dimensional value that measures how\n               big/how much/etc. Scalars do not have any sort of\n               directional component to them. Some examples of scalar\n               measurements are: time, mass and distance.\n               Many scalar values have a vector equivalent.";
    return value;
})());

export const section1 = Link("\"Number\" (Section 1)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=12`);

export const section2 = Link("\"Algebra and Graphs\" (Section 2)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=16`);

export const section3 = Link("\"Coordinate Geometry\" (Section 3)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=22`);

export const section4 = Link("\"Geometry\" (Section 4)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=24`);

export const section5 = Link("\"Mensuration\" (Section 5)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=28`);

export const section6 = Link("\"Trigonometry\" (Section 6)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=30`);

export const section7 = Link("\"Vectors and transformations\" (Section 7)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=32`);

export const section8 = Link("\"Probability\" (Section 8)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=34`);

export const section9 = Link("\"Statistics\" (Section 9)", `${"https://www.cambridgeinternational.org/Images/414416-2020-2022-syllabus.pdf"}#page=36`);

