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
      Array: [],
    },
    {
      variant: 2,
      I: 0.02,
      Iold: 0,
      Alpha: 0.01,
      Beta: 0.005,
      Array: [],
    },
  ],
  gamma: 0.01,
  percentToCreateVariantWithLargeDifferentParametres: 1,
  percentOfPop: 0.7,
  t: 0,
  T: 2000,
  deltaT: 1,
};

// Elements
let healtyInput = document.getElementById("healty");
let remissionInput = document.getElementById("remission");
let gammaInput = document.getElementById("gamma");
let differentVariantPercentInput = document.getElementById(
  "differentVariantPercent"
);
let timeInput = document.getElementById("time");
let infectedV1Input = document.getElementById("infectedV1");
let infectedV2Input = document.getElementById("infectedV2");
let alphaV1Input = document.getElementById("alphaV1");
let alphaV2Input = document.getElementById("alphaV2");
let betaV1Input = document.getElementById("betaV1");
let betaV2Input = document.getElementById("betaV2");


// Initialization in html
healtyInput.value = data.S;
remissionInput.value = data.R;
gammaInput.value = data.gamma;
differentVariantPercentInput.value =
  data.percentToCreateVariantWithLargeDifferentParametres;
timeInput.value = data.T;
infectedV1Input.value = data.variants[0].I;
infectedV2Input.value = data.variants[1].I;
alphaV1Input.value = data.variants[0].Alpha;
alphaV2Input.value = data.variants[1].Alpha;
betaV1Input.value = data.variants[0].Beta;
betaV2Input.value = data.variants[1].Beta;


// Event listener
healtyInput.addEventListener("change", () => (input.S = healtyInput.value));
remissionInput.addEventListener("change", () => (input.R = remissionInput.value));
gammaInput.addEventListener("change", () => (input.gamma = gammaInput.value));
differentVariantPercentInput.addEventListener("change", () => (input.percentToCreateVariantWithLargeDifferentParametres = differentVariantPercentInput.value));
timeInput.addEventListener("change", () => (input.T = timeInput.value));
infectedV1Input.addEventListener("change", () => (input.variants[0].I = infectedV1Input.value));
infectedV2Input.addEventListener("change", () => (input.variants[1].I = infectedV2Input.value));
alphaV1Input.addEventListener("change", () => (input.variants[0].Alpha = alphaV1Input.value));
alphaV2Input.addEventListener("change", () => (input.variants[1].Alpha = alphaV2Input.value));
betaV1Input.addEventListener("change", () => (input.variants[0].Beta = betaV1Input.value));
betaV2Input.addEventListener("change", () => (input.variants[1].Beta = betaV2Input.value));


function probaMutation(variant, t, gamma) {
  return variant.I * (1 - Math.exp(-gamma * t));
}

function genRand(min, max) {
  return Math.random() * (max - min) + min;
}

function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generatePlotData({ T, evolutionS, evolutionR, variants }) {
  let labels = new Array(T);
  for (let i = 0; i < T; ++i) {
    labels[i] = i;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Sain",
        data: evolutionS,
        borderColor: generateRandomColor(),
      },
      {
        label: "Rémission",
        data: evolutionR,
        borderColor: generateRandomColor(),
      },
      ...variants.map((variant) => {
        return {
          label: "Variant " + variant.variant,
          data: variant.Array,
          borderColor: generateRandomColor(),
          fill: false,
        };
      }),
    ],
  };

  return data;
}

let myChart = new Chart(document.getElementById("myChart"), {});

function generateChart(data) {
  const config = {
    type: "line",
    data: generatePlotData(data),
    options: {
      animation: false,
      spanGaps: true,
      showLine: false,
      scales: {
        x: {
          min: 0,
          max: data.T,
        },
        y: {
          min: 0,
          max: 1,
        },
      },
    },
  };

  myChart.destroy();

  myChart = new Chart(document.getElementById("myChart"), config);
}

function lauchSimulation(data) {
  let {
    S,
    R,
    evolutionS,
    evolutionR,
    variants,
    gamma,
    percentToCreateVariantWithLargeDifferentParametres,
    percentOfPop,
    t,
    T,
    deltaT,
  } = data;

  while (t < T) {
    let S_old = S;
    let R_old = R;
    let S_changer = 0;
    let R_changer = 0;

    variants.forEach((variant) => {
      variant.Iold = variant.I;
      S_changer += -variant.Alpha * S_old * variant.Iold;
      R_changer += variant.Beta * variant.Iold;
      variant.I =
        variant.Iold +
        deltaT * variant.Alpha * S * variant.Iold -
        deltaT * variant.Beta * variant.Iold;
      variant.Array.push(variant.I);
    });

    S = S_old + deltaT * S_changer;
    R = R_old + deltaT * R_changer;

    evolutionS.push(S);
    evolutionR.push(R);

    let possibleNewVariants = [];
    variants.forEach((variant) => {
      if (genRand(0, 1) < probaMutation(variant, deltaT, gamma)) {
        const randomPercent = genRand(0, 100);
        let newI;
        let newAlpha;
        let newBeta;
        if (
          randomPercent > percentToCreateVariantWithLargeDifferentParametres
        ) {
          newAlpha = genRand(variant.Alpha * 0.1, variant.Alpha * 1.9);
          newBeta = genRand(variant.Beta * 0.1, variant.Beta * 1.9);
        } else {
          newAlpha = genRand(variant.Alpha * 1.2, variant.Alpha * 1.4);
          newBeta = genRand(variant.Beta * 0.9, variant.Beta * 1.1);
        }
        newI = genRand(0, variant.I * percentOfPop);

        variant.I -= newI;

        possibleNewVariants.push({
          variant: variants.length + 1,
          I: newI,
          Iold: 0,
          Alpha: newAlpha,
          Beta: newBeta,
          Array: Array(t).fill(null),
        });
      }
    });
    possibleNewVariants.forEach((variant) => variants.push(variant));

    t = t + deltaT;
  }

  generateChart({ T, evolutionS, evolutionR, variants });
}

function reinitialize(data) {
  let newData = {
    S: parseFloat(healtyInput.value),
    R: parseFloat(remissionInput.value),
    gamma: parseFloat(gammaInput.value),
    percentToCreateVariantWithLargeDifferentParametres: parseFloat(
      differentVariantPercentInput.value
    ),
    percentOfPop: parseFloat(data.percentOfPop),
    T: parseFloat(timeInput.value),
    evolutionS: new Array(),
    evolutionR: new Array(),
    t: 0,
    deltaT: 1,
    variants: new Array(),
  };

  newData = {
    ...newData,
    variants: [
      {
        variant: 1,
        I: parseFloat(infectedV1Input.value),
        Iold: 0,
        Alpha: parseFloat(alphaV1Input.value),
        Beta: parseFloat(betaV1Input.value),
        Array: new Array(),
      },
      {
        variant: 2,
        I: parseFloat(infectedV2Input.value),
        Iold: 0,
        Alpha: parseFloat(alphaV2Input.value),
        Beta: parseFloat(betaV2Input.value),
        Array: new Array(),
      },
    ],
  };

  return newData;
}

lauchSimulation(data);

document.getElementById("start").addEventListener("click", function () {
  let newestData = reinitialize(data);
  lauchSimulation(newestData);
});
