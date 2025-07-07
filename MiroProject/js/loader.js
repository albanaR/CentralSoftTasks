// Reads a list of exercise names and dynamically imports them.
// const exercises = [
//     'exercise1-popup',
//     'exercise2-slider',
//     'exercise3-formValidation',
//     // …etc
//   ];
  
//   Promise.all(
//     exercises.map(name => import(`./${name}.js`))
//   ).then(() => {
//     // all modules are loaded; you can even kick off initialization here
//     console.log('All exercise scripts loaded');
//   });
  
// loader.js
import './exercise1-popup.js';
import './exercise2-spinner.js'
console.log('Popup module loaded');
