// Selectors
const rowsC3 = document.querySelector(".note--C3");
const rowC3 = Array.from(rowsC3.children);

const rowsD3 = document.querySelector(".note--D3");
const rowD3 = Array.from(rowsD3.children);

const rowsE3 = document.querySelector(".note--E3");
const rowE3 = Array.from(rowsE3.children);

const rowsF3 = document.querySelector(".note--F3");
const rowF3 = Array.from(rowsF3.children);

const rowsG3 = document.querySelector(".note--G3");
const rowG3 = Array.from(rowsG3.children);

const rowsA3 = document.querySelector(".note--A3");
const rowA3 = Array.from(rowsA3.children);

const rowsB3 = document.querySelector(".note--B3");
const rowB3 = Array.from(rowsB3.children);

// Buttons
const playBtn = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
const bpmInput = document.querySelector(".bpm--input");
const bpmForm = document.querySelector(".bpm--form");
const noteUserInput = document.querySelector(".ui--note");
const scaleUserInput = document.querySelector(".ui--scale");
const chooseScale = document.querySelector(".choose-scale");

// Tone.js
const synth = new Tone.Synth();
synth.oscillator.type = "sine";
const gain = new Tone.Gain(0.1);
synth.connect(gain);
gain.toMaster();

let index = 0;
let baseNote = noteUserInput.value;
let baseScale = scaleUserInput.value;
let chromaticScaleArray;
let userBaseScale;

// Functions

// Create Scale FIX Refresh!!
const createScale = function () {
  convertNotesToFreq(baseNote);

  let userScale = new Scale(baseNote);
  chromaticScaleArray = Object.values(userScale);
  // chromaticScaleArray = [440, 880, 1600];
  console.log(chromaticScaleArray);
};

// Set BPM
const setBPM = function () {
  Tone.Transport.bpm.value = +bpmInput.value;
};

// Note to Frequency Converter
const convertNotesToFreq = function (note, oct = 4) {
  const frequency = Tonal.Note.freq(note + oct);
  baseNote = frequency;
};

const play = function () {
  Tone.Transport.start();
};

// const pause = function () {
//   Tone.Transport.pause();
// };

const stop = function () {
  Tone.Transport.stop();
};

const createMajorScale = function (arr) {
  let indexesMajor = [1, 3, 6, 8, 10];

  arr = arr.filter(function (value, index) {
    return indexesMajor.indexOf(index) == -1;
  });

  console.log(arr);
  return arr;
};

const createMinorScale = function (arr) {
  let indexesMinor = [1, 4, 6, 9, 11];
  arr = arr.filter(function (value, index) {
    return indexesMinor.indexOf(index) == -1;
  });

  console.log(arr);
  return arr;
};

// Repeat Function
function repeat(time, scaleArr) {
  let steps = index % 8;
  index++;

  let inputC3 = rowC3[steps];
  if (inputC3.checked) synth.triggerAttackRelease(scaleArr[0], "8n", time);

  let inputD3 = rowD3[steps];
  if (inputD3.checked) synth.triggerAttackRelease(scaleArr[1], "8n", time);

  let inputE3 = rowE3[steps];
  if (inputE3.checked) synth.triggerAttackRelease(scaleArr[2], "8n", time);

  let inputF3 = rowF3[steps];
  if (inputF3.checked) synth.triggerAttackRelease(scaleArr[3], "8n", time);

  let inputG3 = rowG3[steps];
  if (inputG3.checked) synth.triggerAttackRelease(scaleArr[4], "8n", time);

  let inputA3 = rowA3[steps];
  if (inputA3.checked) synth.triggerAttackRelease(scaleArr[5], "8n", time);

  let inputB3 = rowB3[steps];
  if (inputB3.checked) synth.triggerAttackRelease(scaleArr[6], "8n", time);
}

// Classes
class Scale {
  constructor(
    note01,
    note02,
    note03,
    note04,
    note05,
    note06,
    note07,
    note08,
    note09,
    note10,
    note11,
    note12
  ) {
    this.note01 = baseNote;
    this.note02 = baseNote * 1.059463;
    this.note03 = baseNote * 1.122462;
    this.note04 = baseNote * 1.189207;
    this.note05 = baseNote * 1.259921;
    this.note06 = baseNote * 1.33484;
    this.note07 = baseNote * 1.414214;
    this.note08 = baseNote * 1.498307;
    this.note09 = baseNote * 1.587401;
    this.note10 = baseNote * 1.681793;
    this.note11 = baseNote * 1.781797;
    this.note12 = baseNote * 1.887749;
  }
}

Tone.Transport.scheduleRepeat((time) => {
  repeat(time, userBaseScale);
}, "8n");

// Handlers

window.addEventListener("load", function () {
  createScale();
  userBaseScale = createMajorScale(chromaticScaleArray);
});

noteUserInput.addEventListener("change", function (e) {
  baseNote = e.target.value;
  createScale();

  // REFACTOR
  if (baseScale === "Major")
    userBaseScale = createMajorScale(chromaticScaleArray);

  if (baseScale === "Minor")
    userBaseScale = createMinorScale(chromaticScaleArray);
});

scaleUserInput.addEventListener("change", function (e) {
  baseScale = e.target.value;

  // REFACTOR
  if (baseScale === "Major")
    userBaseScale = createMajorScale(chromaticScaleArray);

  if (baseScale === "Minor")
    userBaseScale = createMinorScale(chromaticScaleArray);

  console.log(baseScale);
});

playBtn.addEventListener("click", function () {
  play();
});

stopBtn.addEventListener("click", function () {
  stop();
});

bpmForm.addEventListener("submit", function (e) {
  e.preventDefault();
  setBPM();
});

// Major Scale
// const getMajorScale = function (object) {
//   const majorScale = { ...object };
//   delete majorScale.note02;
//   delete majorScale.note04;
//   delete majorScale.note07;
//   delete majorScale.note09;
//   delete majorScale.note11;

//   const majorScaleArray = Object.values(majorScale);

//   return majorScaleArray;
// };

// // Minor Scale
// const getMinorScale = function (object) {
//   const minorScale = { ...object };
//   delete minorScale.note02;
//   delete minorScale.note05;
//   delete minorScale.note07;
//   delete minorScale.note10;
//   delete minorScale.note11;

//   const minorScaleArray = Object.values(minorScale);

//   return minorScaleArray;
// };

// const setOctave = function (scale, oct) {
//   notesOct = scale.map((note) => `${note}${oct}`);
//   notesOct.push(scale[0] + (oct + 1));

//   return notesOct;
// };

// setOctave(notes, 3);
// console.log(notesOct);
