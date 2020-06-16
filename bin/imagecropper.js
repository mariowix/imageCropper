#!/usr/bin/env node

var imagecropper = require('../src/index');
const args = require("yargs").argv;

imagecropper(args);