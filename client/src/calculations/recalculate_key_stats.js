import freqToRGBA from "../calculations/freq_to_rgba"

const recalculateKeyStats = (key) => {

  // Make sure key is setup to display and to run physics
  key.physicsSwitchedOn = true
  // Might occasionally want some keys to not display,
  // then set this to false.

  // Record the original size and position
  // to be used in animation later
  key.anchors = {}
  key.anchors.x = key.location.x
  key.anchors.y = key.location.y
  key.location.r += 0.1 * Math.random()  // SORT BY RADIUS = RANDOM, LATER!
  key.anchors.r = key.location.r

  // Firstly, set numerator and denominator if necessary
  // Secondly, calculate stats from these

  if (key.transposePrimes && !key.transposes) {
    // Need to calculate numerator and denominator from prime factors
    let num = 1
    let denom = 1
    for (const primeFactorSubArray of key.transposePrimes) {
      const primeNumber = primeFactorSubArray[0]
      const exponent = primeFactorSubArray[1]
      if (exponent < 0) {
        denom *= primeNumber ** -exponent
      } else {
        num *= primeNumber ** exponent
      }
    }
    // Might also want to reduce num & denom
    // by their GCD as an auxiliary check.
    // But wouldn't be necessary if transpose prime arrays
    // are set up correctly
    key.transposes = {}
    key.transposes.num = num
    key.transposes.denom = denom
  }

  if (key.transposes) {
    const num = key.transposes.num
    const denom = key.transposes.denom
    key.transposes.factor = num / denom
    key.transposes.text = num + "/" + denom
  }

  if (key.transposes) {
    key.bgColour = (state, key) => {
      const keyFreq = key.transposes.factor
      const baseFreq = state.freqs.currentFreq
      return freqToRGBA(keyFreq*baseFreq, 0.8)
    }
  } else {
    key.bgColour = (state, key) => {
      return 'rgba(220, 220, 220, 0.5)'
    }
  }

}

export default recalculateKeyStats
