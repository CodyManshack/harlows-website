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
    beers: {
      draft: {
        items: [
          {
            name: "Turia",
            description:
              "a toasted Oktoberfest Märzen beer brewed in Valencia since 1947",
            sizes: { small: 2, large: 3.5 },
          },
          {
            name: "Complot IPA",
            description:
              "a Mediterranean version of the classic IPA. Intense notes of hops with delicate hints of copper and orange",
            sizes: { small: 2.5, large: 4 },
          },
        ],
      },
      local: {
        subtitle:
          "Emi craft beers are local, from our very own neighborhood (el botànic)!",
        items: [
          {
            name: "La Canya Brown Ale",
            price: 5,
          },
          {
            name: "Tira-Li Golden Ale",
            price: 5,
          },
        ],
      },
      bottles: {
        items: [
          {
            name: "Estrella",
            description: "a Mediterranean lager brewed in Barcelona since 1876",
            price: 3.5,
          },
          {
            name: "Free Damm (non-alcoholic)",
            description:
              "an alcohol-free lager with a light head and an intense aroma",
            price: 3.5,
          },
        ],
      },
    },
    "Water / Soft Drinks": {
      items: [
        {
          name: "Sparkling water",
          price: 2,
        },
        {
          name: "Mineral water",
          sizes: { small: 1.5, large: 3 },
        },
        {
          name: "Coca-Cola / Coke Zero",
          price: 2,
        },
      ],
    },
  },
};
