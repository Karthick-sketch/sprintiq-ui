interface FieldOptionColor {
  name: string;
  colorNumber: number;
  colorClass: string;
}

const FieldOptionColors: FieldOptionColor[] = [
  {
    name: 'Blue 1',
    colorNumber: 1,
    colorClass: 'badge-open',
  },
  {
    name: 'Brown 1',
    colorNumber: 2,
    colorClass: 'badge-in-progress',
  },
  {
    name: 'Green 1',
    colorNumber: 3,
    colorClass: 'badge-done',
  },
  {
    name: 'Green 2',
    colorNumber: 4,
    colorClass: 'badge-low',
  },
  {
    name: 'Yellow 1',
    colorNumber: 5,
    colorClass: 'badge-medium',
  },
  {
    name: 'Brown 2',
    colorNumber: 6,
    colorClass: 'badge-high',
  },
  {
    name: 'Red 1',
    colorNumber: 7,
    colorClass: 'badge-urgent',
  },
];

export { FieldOptionColors };
