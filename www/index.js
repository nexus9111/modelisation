import Variant from './Variant.js'

let data = {
  S: 0.97,
  R: 0,
  evolutionS: [],
  evolutionR: [],
  variants: [
    {
      variant: 1,
      I: 0.01,
      Iold: 0,
      Alpha: 0.01,
      Beta: 0.001,
      Array: []
    },
    {
      variant: 2,
      I: 0.02,
      Iold: 0,
      Alpha: 0.01,
      Beta: 0.005,
      Array: []
    }
  ],
  gamma: 0.01,
  percentToCreateVariantWithLargeDifferentParametres: 1,
  percentOfPop: 0.7,
  t: 0,
  T: 2000,
  deltaT: 1
} 

// Elements
let healtyInput = document.getElementById('healty');
let gammaInput = document.getElementById('gamma');
let differentVariantPercentInput = document.getElementById('differentVariantPercent');
let timeInput = document.getElementById('time');

// Initialization in html
healtyInput.value = S;
gammaInput.value = gamma;
differentVariantPercentInput.value = percentToCreateVariantWithLargeDifferentParametres;
timeInput.value = T;

// Event listener
healtyInput.addEventListener('input', () => input.S = healtyInput.value);
gammaInput.addEventListener('input', () => input.gamma = gammaInput.value);
differentVariantPercentInput.addEventListener('input', () => input.percentToCreateVariantWithLargeDifferentParametres = differentVariantPercentInput.value);
timeInput.addEventListener('change', () => input.T = timeInput.value);


function probaMutation(variant, t) {
  return (variant.getI() * (1 - Math.exp(-gamma * t)));
}

function genRand(min, max, decimalPlaces) {  
  var rand = Math.random() * (max - min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generatePlotData() {
  let labels = new Array(T);
  for (let i = 0; i < T; ++i) {
    labels[i] = i;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Sain',
        data: listS,
        borderColor: generateRandomColor(),
      },
      {
        label: 'Rémission',
        data: listR,
        borderColor: generateRandomColor(),
      },
      ...variants.map((variant) => {
        return {
          label: 'Variant ' + variant.getVariant(),
          data: variant.getArray(),
          borderColor: generateRandomColor(),
          fill: false,
        }
      })
    ]
  };

  return data;
}

let myChart = new Chart(document.getElementById('myChart'), {});

function generateChart() {
  const config = {
    type: 'line',
    data: generatePlotData(),
    options: {
      scales: {
          y: {
              suggestedMin: 0,
              suggestedMax: 1
          }
      }
  }
  };

  myChart.destroy()
  
  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}


function lauchSimulation() {

  generateChart()
}

// Start
lauchSimulation(data)

document.getElementById("start").onclick = lauchSimulation;