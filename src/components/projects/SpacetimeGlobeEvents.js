import blue_person from "../../images/spacetime_globe/blue_person.png";
import orange_person from "../../images/spacetime_globe/orange_person.png";
import orange_cat from "../../images/spacetime_globe/orange_cat.png";
import blue_person_lightbulb_off from "../../images/spacetime_globe/blue_person_lightbulb_off.png";
import blue_person_lightbulb_on from "../../images/spacetime_globe/blue_person_lightbulb_on.png";
import photon_right from "../../images/spacetime_globe/photon_right.png";
import photon_left from "../../images/spacetime_globe/photon_left.png";
import orange_person_clock from "../../images/spacetime_globe/orange_person_clock.png";
import box from "../../images/spacetime_globe/box.png";
import box_burning from "../../images/spacetime_globe/box_burning.png";
import box_burnt from "../../images/spacetime_globe/box_burnt.png";
import ashes from "../../images/spacetime_globe/ashes.png";
import cat_tail from "../../images/spacetime_globe/cat_tail.png";
import cat_head from "../../images/spacetime_globe/cat_head.png";
import lightbulb_off from "../../images/spacetime_globe/lightbulb_off.png";
import lightbulb_on from "../../images/spacetime_globe/lightbulb_on.png";
import blue_person_gun from "../../images/spacetime_globe/blue_person_gun.png";
import bullet from "../../images/spacetime_globe/bullet.png";
import orange_person_earth from "../../images/spacetime_globe/orange_person_earth.png";
import blue_person_rocket_right from "../../images/spacetime_globe/blue_person_rocket_right.png";
import blue_person_rocket_left from "../../images/spacetime_globe/blue_person_rocket_left.png";

export const eventImages = [
    {
        name: "blue person", // 0
        src: blue_person,
        w: 0.5,
        h: 0.8,
    },
    {
        name: "orange person", // 1
        src: orange_person,
        w: 0.5,
        h: 0.8,
    },
    {
        name: "orange cat", // 2
        src: orange_cat,
        w: 0.6,
        h: 0.5,
    },
    {
        name: "blue person with lightbulb off", // 3
        src: blue_person_lightbulb_off,
        w: 0.6,
        h: 0.8,
    },
    {
        name: "blue person with lightbulb on", // 4
        src: blue_person_lightbulb_on,
        w: 0.6,
        h: 0.8,
    },
    {
        name: "photon facing right", // 5
        src: photon_right,
        w: 0.6,
        h: 0.4,
    },
    {
        name: "photon facing left", // 6
        src: photon_left,
        w: 0.6,
        h: 0.4,
    },
    {
        name: "orange person with clock", // 7
        src: orange_person_clock,
        w: 0.6,
        h: 0.8,
    },
    {
        name: "box", // 8
        src: box,
        w: 0.5,
        h: 0.5,
    },
    {
        name: "box burning", // 9
        src: box_burning,
        w: 0.6,
        h: 0.6,
    },
    {
        name: "box burnt", // 10
        src: box_burnt,
        w: 0.4,
        h: 0.4,
    },
    {
        name: "ashes", // 11
        src: ashes,
        w: 0.5,
        h: 0.4,
    },
    {
        name: "cat tail", // 12
        src: cat_tail,
        w: 0.5,
        h: 0.6,
    },
    {
        name: "cat head", // 13
        src: cat_head,
        w: 0.5,
        h: 0.6,
    },
    {
        name: "lightbulb off", // 14
        src: lightbulb_off,
        w: 0.4,
        h: 0.6,
    },
    {
        name: "lightbulb on", // 15
        src: lightbulb_on,
        w: 0.5,
        h: 0.6,
    },
    {
        name: "blue person with gun", // 16
        src: blue_person_gun,
        w: 0.6,
        h: 0.8,
    },
    {
        name: "bullet", // 17
        src: bullet,
        w: 0.6,
        h: 0.4,
    },
    {
        name: "orange person on earth", // 18
        src: orange_person_earth,
        w: 0.5,
        h: 0.8,
    },
    {
        name: "blue person on rocket facing right", // 19
        src: blue_person_rocket_right,
        w: 0.8,
        h: 0.5,
    },
    {
        name: "blue person on rocket facing left", // 20
        src: blue_person_rocket_left,
        w: 0.7,
        h: 0.6,
    },
];

export const customScenarios = [
    {
        name: "Basic scenario",
        events: [
            { t: -1, x: 0, image: eventImages[0] },
            { t: 0, x: 0, image: eventImages[0] },
            { t: 1, x: 0, image: eventImages[0] },
            { t: 2, x: 0, image: eventImages[0] },
            { t: 3, x: 0, image: eventImages[0] },
            { t: 4, x: 0, image: eventImages[0] },
            { t: -1, x: -0.6, image: eventImages[1] },
            { t: 0, x: 0, image: eventImages[1] },
            { t: 1, x: 0.6, image: eventImages[1] },
            { t: 2, x: 1, image: eventImages[1] },
            { t: 3, x: 1.5, image: eventImages[1] },
            { t: 4, x: 2, image: eventImages[1] },
            { t: 0, x: -3, image: eventImages[9] },
            { t: 0, x: -2, image: eventImages[9] },
            { t: 0, x: -1, image: eventImages[9] },
            { t: 0, x: 0, image: eventImages[9] },
            { t: 0, x: 1, image: eventImages[9] },
            { t: 0, x: 2, image: eventImages[9] },
            { t: 0, x: 3, image: eventImages[9] },
            { t: -1, x: -1, image: eventImages[5] },
            { t: 0, x: 0, image: eventImages[5] },
            { t: 1, x: 1, image: eventImages[5] },
            { t: 2, x: 2, image: eventImages[5] },
            { t: 3, x: 3, image: eventImages[5] },
            { t: 4, x: 4, image: eventImages[5] },
            { t: -1, x: 2, image: eventImages[2] },
            { t: 0, x: 2, image: eventImages[2] },
            { t: 1, x: 2, image: eventImages[2] },
            { t: 2, x: 2, image: eventImages[2] },
            { t: 3, x: 2, image: eventImages[2] },
            { t: 4, x: 2, image: eventImages[2] },
        ],
    },
    {
        name: "Relativity of simultaneity",
        events: [
            { t: -1, x: 1, image: eventImages[8] },
            { t: 0, x: 1, image: eventImages[9] },
            { t: 1, x: 1, image: eventImages[10] },
            { t: 2, x: 1, image: eventImages[10] },
            { t: 3, x: 1, image: eventImages[11] },
            { t: 4, x: 1, image: eventImages[11] },
            { t: -1, x: 0, image: eventImages[7] },
            { t: 0, x: 0, image: eventImages[7] },
            { t: 1, x: 0, image: eventImages[7] },
            { t: 2, x: 0, image: eventImages[7] },
            { t: 3, x: 0, image: eventImages[7] },
            { t: 4, x: 0, image: eventImages[7] },
            { t: -1, x: -1, image: eventImages[8] },
            { t: 0, x: -1, image: eventImages[9] },
            { t: 1, x: -1, image: eventImages[10] },
            { t: 2, x: -1, image: eventImages[10] },
            { t: 3, x: -1, image: eventImages[11] },
            { t: 4, x: -1, image: eventImages[11] },
        ],
    },
];
