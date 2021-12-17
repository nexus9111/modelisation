import Variant from './Variant.js'

let S = 0.6
let R = 0

let listS = []
let listR = []

const variant1 = new Variant(1, 0.2, 0.01, 0.001)
const variant2 = new Variant(2, 0.2, 0.01, 0.01)

const variants = [variant1, variant2]

let gamma = 0.01
let percentToCreateVariantWithLargeDifferentParametres = 1

let t = 0.0
let T = 365
let deltaT = 1

let index = 0

function probaMutation(variant, t) {
  // const tsec = t / 24 / 60 / 60
  return (variant.getI() * (1 - Math.exp(-gamma * t)))
}

function genRand(min, max, decimalPlaces) {  
  var rand = Math.random() * (max - min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

while (t < T) {
  let S_old = S
  let R_old = R
  let S_changer = 0
  let R_changer = 0

  variants.forEach(variant => {
      variant.setIold(variant.getI())

      S_changer += - variant.getAlpha() * S_old * variant.getIold()
      R_changer += variant.getBeta() * variant.getIold()

      variant.setI(variant.getIold() + (deltaT * variant.getAlpha() * S *  variant.getIold()) - (deltaT * variant.getBeta() * variant.getIold()))

      variant.addToArray(variant.getI())
  })
      

  S = S_old + deltaT * S_changer
  R = R_old + deltaT * R_changer

  listS.push(S)
  listR.push(R)

  let tempV = []
  variants.forEach(variant => {
    if (genRand(0, 1, 10) < probaMutation(variant, deltaT)) {
        const randomPercent = genRand(0, 100, 10)
        let newI;
        let newAlpha;
        let newBeta;
        if (randomPercent > percentToCreateVariantWithLargeDifferentParametres) {
          newI = genRand(variant.getI() * 0.1, variant.getI() * 1.9, 10)
          newAlpha = genRand(variant.getAlpha() * 0.1, variant.getAlpha() * 1.9, 10)
          newBeta = genRand(variant.getBeta() * 0.1, variant.getBeta() * 1.9, 10)
        } else {
          newI = genRand(variant.getI() * 0.9, variant.getI() * 1.1, 10)
          newAlpha = genRand(variant.getAlpha() * 0.9, variant.getAlpha() * 1.1, 10)
          newBeta = genRand(variant.getBeta() * 0.9, variant.getBeta() * 1.1, 10)
        }

        const newVariant = new Variant(variants.length, newI, newAlpha, newBeta)

        for (let i = 0; i < T / (t+1); i++) {
          newVariant.addToArray(0)
        }
    }
  })
  tempV.forEach(variant => variants.push(variant))

  t = t + deltaT
}

function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let labels = new Array(T);
for (let i = 0; i<T; ++i){
  labels[i] = i;
}



const data = {
  labels: labels,
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

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

