type Course = (typeof courses)[number];

const courses = [
  "2025.12 _ AutoCAD1",
  "2025.11 _ AutoCAD2",
  "2025.10 _ AutoCAD1",
  "2025.09 _ AutoCAD",
  "2025.04 ~ 05 _ SketchUp2",
  "2025.02 ~ 03 _ SketchUp1",
  "2024.12 ~ 2025.01 _ SketchUp",
  "2024.10 ~ 11 _ SketchUp",
] as const;

export type { Course };
export { courses };
