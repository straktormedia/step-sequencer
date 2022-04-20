const playBtn = document.querySelector(".play");
const stopBtn = document.querySelector(".stop");
const bpmInput = document.querySelector(".bpm--input");
const bpmForm = document.querySelector(".bpm--form");

const synth = new Tone.Synth();
synth.oscillator.type = "sine";
const gain = new Tone.Gain(0.1);
synth.connect(gain);
gain.toMaster();

// const notes = Tonal.Scale.get("C major").notes;
const notes = ["C", "D", "E", "F", "G", "A", "B"];
// const notes = Tonal.Scale.get("G minor").notes;
let notesOct;

// let BPM = Tone.Transport.bpm.value;
let index = 0;

const setBPM = function () {
  Tone.Transport.bpm.value = +bpmInput.value;
};

const setOctave = function (scale, oct) {
  notesOct = scale.map((note) => `${note}${oct}`);
  notesOct.push(scale[0] + (oct + 1));
  return notesOct;
};

setOctave(notes, 3);
console.log(notesOct);

// Rows
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

const rowsC4 = document.querySelector(".note--C4");
const rowC4 = Array.from(rowsC4.children);

Tone.Transport.scheduleRepeat((time) => {
  repeat(time);
}, "8n");

const play = function () {
  Tone.Transport.start();
};

const stop = function () {
  Tone.Transport.stop();
};

// Repeat Function
function repeat(time) {
  let steps = index % 8;
  index++;

  let inputC3 = rowC3[steps];
  if (inputC3.checked) synth.triggerAttackRelease(notesOct[0], "8n", time);

  let inputD3 = rowD3[steps];
  if (inputD3.checked) synth.triggerAttackRelease(notesOct[1], "8n", time);

  let inputE3 = rowE3[steps];
  if (inputE3.checked) synth.triggerAttackRelease(notesOct[2], "8n", time);

  let inputF3 = rowF3[steps];
  if (inputF3.checked) synth.triggerAttackRelease(notesOct[3], "8n", time);

  let inputG3 = rowG3[steps];
  if (inputG3.checked) synth.triggerAttackRelease(notesOct[4], "8n", time);

  let inputA3 = rowA3[steps];
  if (inputA3.checked) synth.triggerAttackRelease(notesOct[5], "8n", time);

  let inputB3 = rowB3[steps];
  if (inputB3.checked) synth.triggerAttackRelease(notesOct[6], "8n", time);

  let inputC4 = rowC4[steps];
  if (inputC4.checked) synth.triggerAttackRelease(notesOct[7], "8n", time);
}

console.log(notes[1]);

playBtn.addEventListener("click", play);
stopBtn.addEventListener("click", stop);

bpmForm.addEventListener("submit", function (e) {
  e.preventDefault();
  setBPM();
});
