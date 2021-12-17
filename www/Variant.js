class Variant {
  constructor(variant, I, Alpha, Beta) {
    this.variant = variant;
    this.I = I;
    this.Iold = 0;
    this.Alpha = Alpha;
    this.Beta = Beta;
    this.Array = [];
  }

  getVariant() {
    return this.variant;
  }

  getI() {
    return this.I;
  }

  getIold() {
    return this.Iold;
  }

  getAlpha() {
    return this.Alpha;
  }

  getBeta() {
    return this.Beta;
  }

  getArray() {
    return this.Array;
  }

  setI(I) {
    this.I = I;
  }

  setIold(Iold) {
    this.Iold = Iold;
  }

  setAlpha(Alpha) {
    this.Alpha = Alpha;
  }

  setBeta(Beta) {
    this.Beta = Beta;
  }

  setArray(Array) {
    this.Array = Array;
  }

  addToArray(value) {
    this.Array.push(value);
  }

  toString() {
    return this.variant + " " + this.I + " " + this.Iold + " " + this.Alpha + " " + this.Beta + " " + this.Array;
  }
}

export default Variant;