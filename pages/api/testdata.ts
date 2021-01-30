const data = [
  {
    name: "q meny 1",
    activeDays: ["MONDAY", "TUESDAY"],
    shopIds: ["ett", "tva", "tre"],
    categories: [
      {
        name: "kategori1",
        products: [
          {
            name: "mat1",
            price: 100,
          },
          {
            name: "mat2",
            price: 200,
          },
          {
            name: "mat3",
            price: 300,
          },
        ],
      },
      {
        name: "kategori2",
        products: [{ name: "mat4", price: 400 }],
      },
    ],
  },
  {
    name: "b meNy 2",
    activeDays: ["WEDNESDAY", "THURSDAY"],
    shopIds: ["tva"],
    categories: [
      {
        name: "kategori3",
        products: [
          {
            name: "mat5",
            price: 500,
          },
          {
            name: "mat6",
            price: 600,
          },
          {
            name: "mat7",
            price: 700,
          },
        ],
      },
      {
        name: "kategori4",
        products: [{ name: "mat8", price: 400 }],
      },
    ],
  },
  {
    name: "a mEnY 3",
    activeDays: ["FRIDAY", "SATURDAY"],
    shopIds: ["tva", "tre"],
    categories: [
      {
        name: "kategori3",
        products: [
          {
            name: "mat8",
            price: 800,
          },
          {
            name: "mat9",
            price: 900,
          },
          {
            name: "mat10",
            price: 1000,
          },
        ],
      },
      {
        name: "kategori4",
        products: [{ name: "mat8", price: 400 }],
      },
    ],
  },
  {
    name: "d MENY 4",
    activeDays: ["SUNDAY"],
    shopIds: ["ett"],
    categories: [
      {
        name: "kategori5",
        products: [
          {
            name: "mat11",
            price: 800,
          },
          {
            name: "mat12",
            price: 900,
          },
          {
            name: "mat13",
            price: 1000,
          },
        ],
      },
      {
        name: "kategori6",
        products: [{ name: "mat14", price: 400 }],
      },
    ],
  },
];

export { data };
