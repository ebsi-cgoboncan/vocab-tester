type PRNG = () => number

type Sow = () => number
export const sow: Sow = () => crypto.getRandomValues(new Uint32Array(1))[0]!

type Mulberry32 = (seed: number) => PRNG
const mulberry32: Mulberry32 = (seed) => {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5

    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Shuffle = <A>(seed: number) => (values: readonly A[]) => readonly A[]
export const shuffle: Shuffle = (seed) => (values) => {
  const random = mulberry32(seed)

  return values.reduceRight(
    (result, _, i) => {
      if (i === 0) return result
      const j = Math.floor(random() * (i + 1))
      ;[result[i], result[j]] = [result[j]!, result[i]!]

      return result
    },
    [...values],
  )
}
