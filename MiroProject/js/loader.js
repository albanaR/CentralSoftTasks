// Reads a list of exercise names and dynamically imports them.
const exercises = [
    'exercise1-popup',
    'exercise2-spinner',
    'exercise3-formValidation',
    'exercise4-slider',
    'exercise5-companyInfo'
  ];
  
  Promise.all(
    exercises.map(name => import(`./${name}.js`))
  ).then(() => {
    console.log('All exercise scripts loaded');
  });
  