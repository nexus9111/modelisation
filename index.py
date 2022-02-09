# Modélisation de la propagation d'un virus | Bouzakri, Coupet, Marchetti, Vasseur
import matplotlib.pyplot as plt
import random
from math import exp
from Variant import Variant

S = 0.97
R = 0
listS = []
listR = []
variant1 = Variant(1, 0.01, 0.01, 0.001)
variant2 = Variant(2, 0.02, 0.01, 0.005)
variants = [
    variant1,
    variant2
]

gamma = 0.01
percentToCreateVariantWithLargeDifferentParametres = 1
percentOfPop = 0.7

t = 0
T = 2000
deltaT = 1

index = 0

def probaMutation(variant : Variant, t : float) -> float:
    return (variant.getI() * (1 - exp(-gamma * t)))

while (t < T):
    S_old = S
    R_old = R
    S_changer = 0
    R_changer = 0
    for i in range(len(variants)):
        variants[i].setIold(variants[i].getI())

        S_changer += - variants[i].getAlpha() * S_old * variants[i].getIold()
        R_changer += variants[i].getBeta() * variants[i].getIold()

        variants[i].setI(variants[i].getIold() + (deltaT * variants[i].getAlpha() * S * variants[i].getIold()) - (deltaT * variants[i].getBeta() * variants[i].getIold()))

        variants[i].addToArray(variants[i].getI())

    S = S_old + deltaT * S_changer
    R = R_old + deltaT * R_changer

    listS.append(S)
    listR.append(R)

    tempLen = []
    for i in range(len(variants)):
        if random.uniform(0, 1) < probaMutation(variants[i], deltaT):

            randomPercent = random.uniform(0,100)
            if (randomPercent > percentToCreateVariantWithLargeDifferentParametres):
                new_alpha = random.uniform(variants[i].getAlpha() * 0.1, variants[i].getAlpha() * 1.9)
                new_beta = random.uniform(variants[i].getBeta() * 0.1, variants[i].getBeta() * 1.9)
            else:
                new_alpha = random.uniform(variants[i].getAlpha() * 1.2, variants[i].getAlpha() * 1.4)
                new_beta = random.uniform(variants[i].getBeta() * 0.9, variants[i].getBeta() * 1.1)

            new_I = random.uniform(0, variants[i].getI() * percentOfPop)
            newV = Variant(variants[-1].getVariant() + 1, new_I, new_alpha, new_beta)
            variants[i].setI(variants[i].getI() - new_I)
            for i in range(int(t)):
                newV.addToArray(None)

            tempLen.append(newV)

    for i in tempLen:
        variants.append(i)

    t = t + deltaT

plt.plot(listR, "b", label="Remission")
plt.plot(listS, "r", label="Sain")
for i in range(len(variants)):
    plt.plot(variants[i].getArray(), label=str(variants[i].getVariant()))

ax = plt.gca()
ax.set_ylim([0, 1])
plt.legend()
plt.show()
