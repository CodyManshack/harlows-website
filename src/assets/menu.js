export default {
  food: {
    tapas: {
      subtitle: "",
      items: [
        {
          name: "meat & cheese plate",
          price: 14,
          description:
            "selection of 2 cured meats and 2 cheeses, served with olive oil and warm bread",
        },
        {
          name: "olives and feta",
          price: 5,
          description: "a mix of assorted olives and feta",
        },
      ],
    },
    "gourmet dips": {
      subtitle:
        "by Toupine et Cabesselle \nserved with handmade fennel crackers",
      items: [
        {
          name: "Artichoke Caviar with Green Olives",
          price: 7,
          description:
            "this dip pairs the powerful taste of artichokes with the gentle sweetness of green olives. Served warm",
        },
      ],
    },
  },
  drinks: {
    cocktails: {
      items: [
        {
          name: "Hot Buttered Rum",
          price: 5,
          description:
            "a small and sweet treat, the perfect nightcap. Hot black spiced rum with sweet butter, whipped cream, cinnamon, and nutmeg",
          seasonal: true,
        },
        {
          name: "Mayan Chocolate",
          price: 10,
          description:
            "a spicy chocolate experience reminiscent of a spicy mole sauce. Notes of cinnamon, chocolate, cherry, and chili pepper",
          seasonal: true,
        },
        {
          name: "Pisco Sour",
          price: 11,
          description:
            "perfectly tart and foamy, made with El Gobernador Pisco",
          egg: true,
        },
        {
          name: "Black Mojito",
          price: 13,
          description: "spiced black rum with refreshing sweet mint",
        },
        {
          name: "Orange Blossom",
          price: 9,
          description:
            "especially easy-to-drink: sweet orange juice with a bit of depth",
        },
      ],
    },
    "alcohol-free cocktails": {
      items: [
        {
          name: "Bumble Bee",
          price: 7,
          description: "honey and citrus",
        },
      ],
    },
    liquors: {
      gin: {
        items: [
          {
            name: "Tanqueray",
            price: 5,
          },
          {
            name: "Nordes",
            price: 6.5,
          },
          {
            name: "Ginraw",
            price: 8,
          },
          {
            name: "Hendrick's",
            price: 9,
          },
          {
            name: "Gin Mare",
            price: 10,
          },
          {
            name: "Le Tribute",
            price: 13,
          },
          {
            name: "Kyoto KiNoTea",
            price: 16,
          },
        ],
      },
      vodka: {
        items: [
          {
            name: "Heredero",
            price: 5.5,
          },
          {
            name: "Grey Goose",
            price: 9,
          },
        ],
      },
    },
  },
};
