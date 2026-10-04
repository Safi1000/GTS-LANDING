// Position of each logo layer inside the original 1024 x 1024 artwork: [x, y, width, height].
// The PNGs live in /public/gts-logo/<name>.png

export const ART_SIZE = 1024;

export type LayerName =
  | "ring" | "circ"
  | "c0" | "c1" | "c2" | "c3" | "c4" | "c5" | "c6"
  | "m0" | "m1"
  | "G" | "S" | "T"
  | "bull" | "arrow" | "bear";

// Paint order (first = back, last = front)
export const LAYER_ORDER: LayerName[] = [
  "ring", "circ",
  "c0", "c1", "c2", "c3", "c4", "c5", "c6",
  "m0", "m1",
  "G", "S", "T",
  "bull", "arrow", "bear",
];

export const LAYERS: Record<LayerName, [number, number, number, number]> = {
  T: [366, 336, 321, 467],
  bull: [106, 248, 197, 240],
  arrow: [277, 227, 126, 156],
  bear: [739, 316, 160, 154],
  c0: [401, 174, 47, 162],
  c1: [447, 168, 45, 168],
  c2: [503, 169, 45, 167],
  c3: [544, 171, 54, 169],
  c4: [594, 260, 44, 80],
  c5: [650, 273, 37, 63],
  c6: [708, 317, 10, 19],
  m0: [353, 418, 105, 85],
  m1: [570, 423, 125, 255],
  circ: [242, 628, 542, 219],
  ring: [188, 128, 656, 758],
  G: [125, 338, 326, 365],
  S: [569, 341, 326, 362],
};

// Timestamps (ms) of each beat, handy if you want captions or sound cues in sync.
export const BEATS = {
  "market-open": [
    [0, "Ring draws itself from the top"],
    [500, "Circuits light up from the T outward"],
    [900, "Candles print one by one, tallest last"],
    [1500, "Bull charges in, then the bear"],
    [2050, "Arrow fires upward"],
    [2400, "G, T and S stamp into place"],
    [3100, "Light sweeps across the gold"],
  ],
  "bull-vs-bear": [
    [0, "Bull and bear paw the ground outside the ring"],
    [800, "Both charge at each other"],
    [1250, "Impact: shockwave, sparks, a short shake"],
    [1350, "Ring bursts around from the top"],
    [1500, "Candles and circuits fire"],
    [1800, "G and S slam in from the sides, T drops"],
    [2400, "Arrow fires, light sweeps the gold"],
  ],
} as const;
