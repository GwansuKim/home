/* main.js */
//import * as md from "./module.js";
//md.module("test");
//md.area(10, 20);
import { module as mod, area } from "./module.js";
mod("test");
area(10, 20);

import sq, { circle } from "./module1.js";
sq();
circle();
