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
          name: "cheese plate",
          price: 8,
          description:
            "selection of 2 cheeses, served with olive oil and warm bread",
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
        "by Toupine et Cabesselle. \nServed with handmade fennel crackers",
      items: [
        {
          name: "Artichoke Caviar with Green Olives",
          price: 7,
          description:
            "this dip pairs the powerful taste of artichokes with the gentle sweetness of green olives. Served warm",
        },
        {
          name: "Mushroom Cream with Summer Truffle",
          price: 7,
          description:
            "the refined flavors of porcini mushrooms and summer truffles combine into a sultry, creamy dip. Served warm",
        },
        {
          name: "Poichichade with Fresh Cilantro",
          price: 7,
          description:
            "a French dip of pureed chickpeas – similar to hummus – with fresh cilantro. Served chilled",
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
        {
          name: "Dapper Dan",
          price: 7,
          description: "tropical with herbal and spiced notes",
        },
        {
          name: "Garden Club",
          price: 8,
          description: "a raspberry dessert made fluffy by egg white",
          egg: true,
        },
        {
          name: "Shirley Temple",
          price: 6,
          description: "bubbly sweet pomegranate",
        },
        {
          name: "Jeanne Collins",
          price: 7,
          description: "bubbly with bittersweet lemon",
        },
        {
          name: "Lisa-Lou Belle",
          price: 7,
          description: "sweet lemon and lime with spices",
        },
        {
          name: "Lemon Fizz",
          price: 8,
          description: "sweet and bubbly lemon with fluffy egg white",
        },
      ],
    },
    liquors: {
      subtitle: "priced per glass",
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
      rum: {
        items: [
          {
            name: "Bacardi",
            price: 5,
          },
          {
            name: "Malibu",
            price: 5,
          },
          {
            name: "Kraken",
            price: 6.5,
          },
          {
            name: "Don Papa Baroko",
            price: 8.5,
          },
          {
            name: "Plantation XO 20",
            price: 11,
          },
          {
            name: "Flor de Caña 19",
            price: 13,
          },
        ],
      },
      brandy: {
        items: [
          {
            name: "Carlos I",
            price: 7,
          },
          {
            name: "Courvoisier VSOP Cognac",
            price: 10,
          },
          {
            name: "Pere Magloire Calvados VSOP",
            price: 10,
          },
        ],
      },
      bourbon: {
        items: [
          {
            name: "Buffalo Trace",
            price: 7,
          },
          {
            name: "Wild Turkey Longbranch",
            price: 9.5,
          },
        ],
      },
      whiskey: {
        items: [
          {
            name: "Bulleit Rye",
            price: 8.5,
          },
          {
            name: "Hibiki Harmony Master's Select",
            price: 25,
          },
        ],
      },
      scotch: {
        items: [
          {
            name: "Monkey Shoulder",
            price: 7,
          },
          {
            name: "Johnnie Walker Island Green",
            price: 10,
          },
          {
            name: "Macallan 12",
            price: 16,
          },
        ],
      },
      tequila: {
        items: [
          {
            name: "Cruzplata Reposado",
            price: 6.5,
          },
          {
            name: "Volcan Blanco",
            price: 9.5,
          },
          {
            name: "Don Julio Añejo",
            price: 14.5,
          },
        ],
      },
      mezcal: {
        items: [
          {
            name: "Nucano Tobala Joven",
            price: 12,
          },
        ],
      },
    },
    beers: {
      draft: {
        items: [
          {
            name: "Turia",
            type: "Märzen",
            description:
              "a toasted Oktoberfest Märzen beer brewed in Valencia since 1947",
            sizes: { small: 2, large: 3.5 },
          },
          {
            name: "Complot",
            type: "IPA",
            description:
              "a Mediterranean version of the classic IPA. Intense notes of hops with delicate hints of copper and orange",
            sizes: { small: 2.5, large: 4 },
          },
        ],
      },
      "local • Emi": {
        subtitle:
          "Emi craft beers are local, from our very own neighborhood (el botànic)!",
        items: [
          {
            name: "La Canya",
            type: "Brown Ale",
            price: 5,
          },
          {
            name: "Tira-Li Golden Ale",
            type: "Golden Ale",
            price: 5,
          },
        ],
      },
      bottles: {
        items: [
          {
            name: "Estrella",
            type: "Lager",
            description: "a Mediterranean lager brewed in Barcelona since 1876",
            price: 3.5,
          },
          {
            name: "Free Damm (non-alcoholic)",
            type: "Lager",
            description:
              "an alcohol-free lager with a light head and an intense aroma",
            price: 3.5,
          },
        ],
      },
    },
    "Water / soft drinks": {
      items: [
        {
          name: "Sparkling water",
          price: 2,
        },
        {
          name: "Mineral water",
          price: 1.5,
          sizeLabel: "330mL",
        },
        {
          name: "Mineral water",
          price: 3,
          sizeLabel: "1L",
        },
        {
          name: "Coca-Cola / Coke Zero",
          price: 2,
        },
        {
          name: "Ginger Ale",
          price: 3,
        },
        {
          name: "Casera Gaseosa",
          price: 2.5,
        },
      ],
    },
    coffee: {
      items: [
        {
          name: "Espresso",
          price: 3,
        },
        {
          name: "Americano",
          price: 3,
        },
        {
          name: "Cappuccino",
          price: 3.5,
        },
      ],
    },
    wine: {
      red: {
        items: [
          {
            name: "828",
            type: "Crianza",
            sizes: { glass: 6, bottle: 22 },
          },
          {
            name: "Aconcagua Alta",
            type: "Cabernet Sauvignon",
            year: 2019,
            location: "Valle del Aconcagua, Chile",
            description:
              "dry and powerful, its balanced acidity and fruity flavor include notes of black fruits and hints of spice and tobacco",
            sizes: { bottle: 50 },
          },
        ],
      },
      white: {
        items: [
          {
            name: "Murviedro",
            type: "Sauvignon Blanc",
            sizes: { glass: 6, bottle: 22 },
          },
          {
            name: "Mar de Frades",
            type: "Albariño",
            year: 2021,
            location: "Galicia, Spain",
            description:
              "aromas of tropical fruits with floral and balsamic notes. The ocean breeze of the Salnés Valley imparts a slightly saline character",
            sizes: { bottle: 30 },
          },
        ],
      },
      cava: {
        items: [
          {
            name: "Freixenet",
            type: "Negro Brut",
            sizes: { glass: 8, bottle: 26 },
          },
          {
            name: "Gramona Imperial",
            type: "Gran reserva brut",
            year: 2017,
            location: "Sant Sadurní d´Anoia, Spain",
            description:
              "A pale yellow sparkling wine with ripe fruit aromas and a fine, creamy palate. The embodiment of elegance, it pairs well with Iberian ham.",
            sizes: { bottle: 42 },
          },
        ],
      },
      champagne: {
        items: [
          {
            name: "Moët & Chandon",
            type: "Brut Impérial",
            location: "Champagne, France",
            description:
              "Enchanting and lively, characterized by a sparkling bouquet of green apple, citrus fruit, and delicate white flowers. Its palate reveals fine bubbles, refreshing notes of lemon, and subtle hints of nuttiness, offering a captivating blend of flavors.",
            sizes: { bottle: 80 },
          },
        ],
      },
      vermut: {
        items: [
          {
            name: "4xavos",
            type: "Red Vermouth",
            location: "Valencia, Spain",
            description:
              "Traditional fortified wine made from red Grenache grapes and 21 herbs",
            sizes: { glass: 5, bottle: 20 },
          },
        ],
      },
      rosé: {
        items: [
          {
            name: "Mirabeau X",
            location: "Côtes de Provence, France",
            description:
              "Delicate dry notes of frangipane, vineyard peach and citrus. An airy and mouthwatering rosé and a great example of this stunning Provence appellation",
            sizes: { glass: 7, bottle: 26 },
          },
          {
            name: "The Pale",
            year: 2021,
            location: "Côtes de Provence, France",
            description:
              "A delicious blend of Grenache, Cinsault, and Syrah that grow on the Mediterranean coast where the salty, sun-drenched soils give the wine a crisp yet fruity character",
            sizes: { glass: 9, bottle: 33 },
          },
        ],
      },
    },
  },
};
