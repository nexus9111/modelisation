import Variant from './variant'

let S = 0.2
let R = 0

let listS = []
let listR = []

const variant1 = new Variant(1, 0.8, 0.01, 0.01)
const variant2 = new Variant(2, 0.7, 0.01, 0.01)

const variants = [variant1, variant2]

let gamma = 3
let percentToCreateVariantWithLargeDifferentParametres = 1

let t = 0.0
let T = 365
let deltaT = 0.01

let index = 0

function probaMutation(variant, t) {
  const tsec = t / 24 / 60 / 60
  return (variant.getI() * (1 - Math.exp(-gamma * tsec)))
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
      variant.setIold(variant.getI())) 

      S_changer += - variant.getAlpha() * S_old * variant.getIold()
      R_changer += variant.getBeta() * variant.getIold()

      variant.setI(variant.getIold() + (deltaT * variant.getAlpha() * S *  variant.getIold()) - (deltaT * variant.getBeta() * variant.getIold()))

      variant.addToArray(variant.getI())
  })
      

  S = S_old + deltaT * S_changer
  R = R_old + deltaT * R_changer

  listS.push(S)
  listR.push(R)

  variants.forEach(variant => {
    if (genRand(0, 1, 10) > probaMutation(variant, t)) {
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
        variants.push(newVariant)
    }
    
  })
  t = t + deltaT
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
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

