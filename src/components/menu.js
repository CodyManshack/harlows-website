export default {
  tapas: {
    label: { en: "tapas", es: "tapas" },
    subtitle: "",
    items: [
      {
        name: "meat & cheese plate",
        price: 14,
        description: {
          en: "selection of 2 cured meats and 2 cheeses, served with olive oil and warm bread",
          es: "selección de 2 embutidos y 2 quesos, servido con aceite de oliva y pan caliente",
        },
        dairy: true,
      },
      {
        name: "cheese plate",
        price: 8,
        description: {
          en: "selection of 2 cheeses, served with olive oil and warm bread",
          es: "selección de 2 quesos, servido con aceite de oliva y pan caliente",
        },
        dairy: true,
      },
      {
        name: { en: "olives and feta", es: "aceitunas con feta" },
        price: 5,
        description: {
          en: "a mix of assorted olives and feta",
          es: "una mezcla de aceitunas y queso feta",
        },
        dairy: true,
      },
    ],
  },
  "gourmet dips": {
    label: { en: "gourmet dips", es: "dips gourmet" },
    subtitle: {
      en: "by Toupine et Cabesselle. served with handmade fennel crackers",
      es: "por Toupine et Cabesselle. servido con crackers de hinojo hechos a mano",
    },
    items: [
      {
        name: {
          en: "Artichoke Caviar with Green Olives",
          es: "Artichoke Caviar con Green Olives",
        },
        price: 7,
        description: {
          en: "this dip pairs the powerful taste of artichokes with the gentle sweetness of green olives. Served warm",
          es: "este dip combina el potente sabor de las alcachofas con el suave dulzor de las aceitunas verdes. Se sirve caliente",
        },
      },
      {
        name: {
          en: "Mushroom Cream with Summer Truffle",
          es: "Mushroom Cream con Summer Truffle",
        },
        price: 7,
        description: {
          en: "the refined flavors of porcini mushrooms and summer truffles combine into a sultry, creamy dip. Served warm",
          es: "los sabores refinados de las setas porcini y las trufas de verano se combinan en un dip suave y cremoso. Se sirve caliente",
        },
        dairy: true,
      },
      {
        name: {
          en: "Poichichade with Fresh Cilantro",
          es: "Poichichade con Cilantro Fresco",
        },
        price: 7,
        description: {
          en: "a French dip of pureed chickpeas – similar to hummus – with fresh cilantro. Served chilled",
          es: "un dip francés de puré de garbanzos – similar al hummus – con cilantro fresco. Se sirve frío",
        },
        dairy: true,
      },
    ],
  },
  cocktails: {
    label: { en: "cocktails", es: "cócteles" },
    items: [
      {
        name: "The Alamo",
        price: 12,
        description: {
          en: "smoky with lime, grapefruit, and tequila",
          es: "ahumado con lima, pomelo y tequila",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Amaretto Sour",
        price: 10,
        description: {
          en: "strong almond liqueur with a touch of sweetness, tartness, and fluffiness",
          es: "licor de almendra fuerte con un toque de dulzor, acidez y suavidad",
        },
        egg: true,
        img: "/cocktails/amarettosour",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Americano",
        price: 8,
        description: {
          en: "bubbly and bitter with Campari",
          es: "burbujeante y amargo con Campari",
        },
        profile: { boozy: 1, bitter: 5, sweet: 1, citrus: 0, tart: 0 },
      },
      {
        name: "Aviation",
        price: 10,
        description: {
          en: "floral violet liqueur with tart lemon and maraschino cherry",
          es: "licor de violeta floral con limón ácido y cereza maraschino",
        },
        img: "/cocktails/aviation/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Bacardi Cocktail",
        price: 9,
        description: {
          en: "exceptionally smooth and sweet, pomegranate and lime",
          es: "granada y lima excepcionalmente suaves y dulces",
        },
        img: "/cocktails/bacardicocktail/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Bee's Knees",
        price: 9,
        description: {
          en: "a sweet punch of honey, lemon, and orange",
          es: "un dulce golpe de miel, limón y naranja",
        },
        profile: { boozy: 1, bitter: 0, sweet: 4, citrus: 3, tart: 3 },
      },
      {
        name: "Black Mojito",
        price: 13,
        description: {
          en: "spiced black rum with refreshing sweet mint",
          es: "ron negro especiado con menta dulce fría",
        },
        img: "/cocktails/blackmojito/0.25x.png",
        profile: { boozy: 2, bitter: 0, sweet: 4, citrus: 2, tart: 3 },
      },
      {
        name: "Boulevardier",
        price: 10,
        description: {
          en: "a classic negroni with whiskey in place of gin – resulting in a bitter spiced rye whiskey flavor",
          es: "negroni clásico con whisky en lugar de ginebra – sabor amargo y especiado de rye",
        },
        img: "/cocktails/boulevardier/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Brandy Alexander",
        price: 9,
        description: {
          en: "dessert of brandy, creamy nutmeg and chocolate",
          es: "postre cremoso de moscada y chocolate",
        },
        profile: { boozy: 2, bitter: 0, sweet: 5, citrus: 0, tart: 0 },
        dairy: true,
      },
      {
        name: "Cadillac Margarita",
        price: 15,
        description: {
          en: "an elevated margarita made with top-shelf Volcan tequila blanco, Grand Marnier premium orange liqueur, and a salted rim",
          es: "la margarita elevada: con tequila blanco Volcan de primera calidad, licor de naranja Grand Marnier, y un borde de sal",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Clover Club",
        price: 10,
        description: {
          en: "for raspberry lovers, fluffy, sweet, and tart",
          es: "espumoso, dulce y ácido, para amantes de la frambuesa",
        },
        egg: true,
        profile: { boozy: 1, bitter: 0, sweet: 4, citrus: 1, tart: 5 },
      },
      {
        name: "Espresso Martini",
        price: 12,
        description: {
          en: "deep flavors of specialty espresso with a sweet finish",
          es: "sabores profundos de espresso especial con un final dulce",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "French 75",
        price: 9,
        description: {
          en: "cava fortified with gin and sweet lemon flavors",
          es: "cava fortificado con ginebra y sabores dulces de limón",
        },
        profile: { boozy: 1, bitter: 0, sweet: 4, citrus: 2, tart: 3 },
      },
      {
        name: "Gin Fizz",
        price: 11,
        description: {
          en: "sweet and bubbly lemon with fluffy egg white",
          es: "limón dulce y claras de huevo espumosas",
        },
        profile: { boozy: 2, bitter: 0, sweet: 2, citrus: 2, tart: 2 },
      },
      {
        name: "Grasshopper",
        price: 10,
        description: {
          en: "after winning a 1918 New York cocktail contest, this mint chocolate dessert cocktail has continued to delight for over 106 years",
          es: "tras ganar un concurso de cócteles en Nueva York en 1918, este cóctel de postre con chocolate y menta ha seguido deleitando durante más de 106 años",
        },
        profile: { boozy: 1, bitter: 0, sweet: 5, citrus: 0, tart: 0 },
        dairy: true,
      },
      {
        name: "Hemingway Special",
        price: 8,
        description: {
          en: "a classic daquiri with a cherry twist and bright grapefruit",
          es: "un daiquirí clásico con un toque de cereza y pomelo brillante",
        },
        img: "/cocktails/hemingwayspecial/0.25x.png",
        profile: { boozy: 2, bitter: 0, sweet: 4, citrus: 5, tart: 5 },
      },
      {
        name: "Hot Buttered Rum",
        price: 5,
        description: {
          en: "a small and sweet treat, the perfect nightcap. Hot black spiced rum with sweet butter, whipped cream, cinnamon, and nutmeg",
          es: "un pequeño y dulce capricho, la perfecta copa nocturna. Ron negro caliente especiado con mantequilla dulce, nata montada, canela y nuez moscada",
        },
        seasonal: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
        dairy: true,
      },
      {
        name: "Jack Rose",
        price: 12,
        description: {
          en: "sweet applejack and pomegranate",
          es: "applejack dulce y granada",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "The Left Hand",
        price: 10,
        description: {
          en: "bourbon with notes of bitter dark chocolate",
          es: "bourbon con notas de chocolate negro amargo",
        },
        profile: { boozy: 4, bitter: 5, sweet: 1, citrus: 0, tart: 1 },
      },
      {
        name: "Manhattan",
        price: 11,
        description: {
          en: "sweet bourbon with bitter notes",
          es: "rye whiskey con matices dulces y amargos",
        },
        profile: { boozy: 5, bitter: 4, sweet: 1, citrus: 0, tart: 1 },
      },
      {
        name: "Man O' War",
        price: 8,
        description: {
          en: "bourbon with subtly spiced orange",
          es: "bourbon con naranja especiada",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Margarita '42",
        price: 11,
        description: {
          en: "a classic margarita: the perfect combination of tequila reposado and citric sweetness with a salted rim",
          es: "una margarita clásica: la combinación perfecta de tequila reposado y dulzor cítrico con un borde de sal",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Martini Classic",
        description: {
          en: "the classic dry martini – choose vodka or gin – clean, dirty, or filthy",
          es: "el martini seco clásico – elija su ginebra o vodka – limpio, sucio o muy sucio",
        },
        img: "/cocktails/dirtymartini/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Mayan Chocolate",
        price: 10,
        description: {
          en: "a spicy chocolate experience reminiscent of a spicy mole sauce. Notes of cinnamon, chocolate, cherry, and chili pepper",
          es: "un Harlow’s Original: una experiencia de chocolate picante que recuerda a una salsa mole picante. Notas de canela, chocolate, cereza y chile",
        },
        seasonal: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Moscow Mule",
        price: 10,
        description: {
          en: "the kick of ginger beer paired with tart lime",
          es: "el sabor de ginger beer combinada con lima ácida",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Negroni",
        price: 9,
        description: {
          en: "herbal with slightly sweet undertones",
          es: "herbal con matices un poco dulces",
        },
        profile: { boozy: 3, bitter: 3, sweet: 1, citrus: 0, tart: 1 },
      },
      {
        name: "New York Sour",
        price: 12,
        description: {
          en: "an update of the Whiskey Sour that incorporates red wine",
          es: "una revisión del Whiskey Sour que incorpora vino tinto",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Old Fashioned",
        price: 12,
        description: {
          en: "sweet bourbon with bitter notes",
          es: "bourbon dulce con notas amargas",
        },
        profile: { boozy: 3, bitter: 2, sweet: 3, citrus: 3, tart: 2 },
      },
      {
        name: "Orange Blossom",
        price: 9,
        description: {
          en: "especially easy-to-drink: sweet orange juice with a bit of depth",
          es: "especialmente suave: zumo de naranja dulce con un poco de profundidad",
        },
        img: "/cocktails/orangeblossom/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Pisco Sour",
        price: 11,
        description: {
          en: "perfectly tart and foamy, made with El Gobernador Pisco",
          es: "perfectamente ácido y espumoso, con Pisco El Gobernador",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Ramos Gin Fizz",
        price: 13,
        description: {
          en: "a large, creamy, and citrusy cocktail from 1888 featuring the aroma of orange blossom",
          es: "un cóctel grande, cremoso y cítrico de 1888 con aroma de azahar",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Rusty Nail",
        price: 10,
        description: {
          en: "once one of the most popular cocktails in America: scotch and drambuie complete this simple yet strong, scotch-heavy cocktail",
          es: "en su día uno de los cócteles más populares de América: scotch y Drambuie completan este cóctel sencillo pero notablemente fuerte, cargado de scotch",
        },
        img: "/cocktails/rustynail/0.25x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Sazerac",
        price: 12,
        description: {
          en: "the Official Cocktail of New Orleans marries the spice of rye whiskey with cognac and aromatic absinthe",
          es: "el Cóctel Oficial de Nueva Orleans marida las especias del rye whiskey con coñac y la absenta aromática",
        },
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "Sidecar",
        price: 12,
        description: {
          en: "tart, dry orange with a sugared rim, made with Courvoisier VSOP premium cognac",
          es: "naranja ácida y seca con un borde azucarado, hecho con coñac premium Courvoisier VSOP",
        },
        profile: { boozy: 3, bitter: 1, sweet: 3, citrus: 2, tart: 3 },
      },
      {
        name: "Tom Collins",
        price: 9,
        description: {
          en: "bubbly with bittersweet lemon on ice",
          es: "burbujeante con limón amargo y dulce con hielo",
        },
        profile: { boozy: 2, bitter: 0, sweet: 3, citrus: 4, tart: 3 },
      },
      {
        name: "Valencian Suntan",
        price: 10,
        description: {
          en: "spiced orange with lemon",
          es: "naranja especiada con limón",
        },
        profile: { boozy: 2, bitter: 2, sweet: 3, citrus: 5, tart: 5 },
      },
      {
        name: "Vesper Martini",
        price: 12,
        description: {
          en: "an extra strong martini made famous by James Bond in 1953: gin, dry vermouth, and vodka",
          es: "martini extra fuerte que James Bond hizo famoso en 1953: gin, vermut seco y vodka",
        },
        profile: { boozy: 5, bitter: 0, sweet: 0, citrus: 1, tart: 0 },
      },
      {
        name: "Whiskey Sour",
        price: 11,
        description: {
          en: "the classic blend of fluffy, sweet, lemon, and bourbon",
          es: "la combinación clásica espumosa de bourbon y cítricos",
        },
        egg: true,
        img: "/cocktails/whiskeysour/0.33x.png",
        profile: { boozy: 0, bitter: 0, sweet: 0, citrus: 0, tart: 0 },
      },
      {
        name: "White Lady",
        price: 9,
        description: {
          en: "sweet lemonade with a small touch of orange",
          es: "limón dulce con un poco de naranja",
        },
        profile: { boozy: 2, bitter: 0, sweet: 4, citrus: 5, tart: 4 },
      },
    ],
  },
  "alcohol-free cocktails": {
    label: { en: "alcohol-free cocktails", es: "cócteles sin alcohol" },
    items: [
      {
        name: "Bumble Bee",
        price: 7,
        description: {
          en: "honey and citrus",
          es: "miel y cítricos",
        },
        profile: { boozy: 0, bitter: 0, sweet: 4, citrus: 3, tart: 3 },
      },
      {
        name: "Dapper Dan",
        price: 7,
        description: {
          en: "tropical with herbal and spiced notes",
          es: "tropical con notas herbáceas y especiadas",
        },
        profile: { boozy: 0, bitter: 2, sweet: 5, citrus: 0, tart: 2 },
      },
      {
        name: "Garden Club",
        price: 8,
        description: {
          en: "a raspberry dessert made fluffy by egg white",
          es: "un postre esponjoso de frambuesa con clara de huevo",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 4, citrus: 1, tart: 5 },
      },
      {
        name: "Shirley Temple",
        price: 6,
        description: {
          en: "bubbly sweet pomegranate",
          es: "burbujeante granada dulce",
        },
        profile: { boozy: 0, bitter: 0, sweet: 5, citrus: 2, tart: 0 },
      },
      {
        name: "Jeanne Collins",
        price: 7,
        description: {
          en: "bubbly with bittersweet lemon",
          es: "burbujeante con limón agridulce",
        },
        profile: { boozy: 0, bitter: 0, sweet: 3, citrus: 4, tart: 3 },
      },
      {
        name: "Lisa-Lou Belle",
        price: 7,
        description: {
          en: "sweet lemon and lime with spices",
          es: "limón y lima dulces con especias",
        },
        profile: { boozy: 0, bitter: 2, sweet: 4, citrus: 4, tart: 3 },
      },
      {
        name: "Lemon Fizz",
        price: 8,
        description: {
          en: "sweet and bubbly lemon with fluffy egg white",
          es: "limón dulce y claras de huevo esponjosas",
        },
        egg: true,
        profile: { boozy: 0, bitter: 0, sweet: 2, citrus: 2, tart: 2 },
      },
    ],
  },
  liquors: {
    label: { en: "liquors", es: "licóres" },
    subtitle: { en: "priced per glass", es: "precio por vaso" },
    gin: {
      label: { en: "gin", es: "ginebra" },
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
      label: { en: "rum", es: "ron" },
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
    label: { en: "beers", es: "cervezas" },
    draft: {
      label: { en: "draft", es: "de barril" },
      items: [
        {
          name: "Turia",
          type: "Märzen",
          description: {
            en: "a toasted Oktoberfest Märzen beer brewed in Valencia since 1947",
            es: "una cerveza tostada de Oktoberfest/Märzen elaborada en Valencia desde 1947",
          },
          sizes: { small: 2, large: 3.5 },
        },
        {
          name: "Complot",
          type: "IPA",
          description: {
            en: "a Mediterranean version of the classic IPA. Intense notes of hops with delicate hints of copper and orange",
            es: "una versión mediterránea de la clásica IPA. Notas intensas de lúpulo con delicados toques de cobre y naranja",
          },
          sizes: { small: 2.5, large: 4 },
        },
      ],
    },
    "local • Emi": {
      subtitle: {
        en: "Emi craft beers are local, from our very own neighborhood (el botànic)!",
        es: "¡Las cervezas artesanales Emi son locales, de nuestro propio barrio (el botànic)!",
      },
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
      label: { en: "bottles", es: "botellas" },
      items: [
        {
          name: "Estrella",
          type: "Lager",
          description: {
            en: "a Mediterranean lager brewed in Barcelona since 1876",
            es: "una cerveza lager mediterránea elaborada en Barcelona desde 1876",
          },
          price: 3.5,
        },
        {
          name: "Free Damm (non-alcoholic)",
          type: "Lager",
          description: {
            en: "an alcohol-free lager with a light head and an intense aroma",
            es: "un lager sin alcohol con una textura ligera y un aroma intenso",
          },
          price: 3.5,
        },
      ],
    },
  },
  "Water & sodas": {
    label: { en: "water & sodas", es: "agua y refrescos" },
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
        name: "Ginger Beer",
        price: 2,
      },
      {
        name: "Casera Gaseosa",
        price: 2.5,
      },
    ],
  },
  coffee: {
    label: { en: "coffee", es: "café" },
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
    label: { en: "wine", es: "vino" },
    red: {
      label: { en: "red", es: "tinto" },
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
          description: {
            en: "dry and powerful, its balanced acidity and fruity flavor include notes of black fruits and hints of spice and tobacco",
            es: "seco y potente, su acidez equilibrada y su sabor afrutado incluyen notas de frutas negras y toques de especias y tabaco",
          },
          sizes: { bottle: 50 },
        },
      ],
    },
    white: {
      label: { en: "white", es: "blanco" },
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
          description: {
            en: "aromas of tropical fruits with floral and balsamic notes. The ocean breeze of the Salnés Valley imparts a slightly saline character",
            es: "aromas de frutas tropicales con notas florales y balsámicas. La brisa oceánica del Valle de Salnés imparte un carácter ligeramente salino",
          },
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
          description: {
            en: "a pale yellow sparkling wine with ripe fruit aromas and a fine, creamy palate. The embodiment of elegance, it pairs well with Iberian ham",
            es: "un vino espumoso de color amarillo pálido con aromas de frutas maduras y un paladar fino y cremoso. La encarnación de la elegancia, marida bien con jamón ibérico",
          },
          sizes: { bottle: 42 },
        },
      ],
    },
    champagne: {
      label: { en: "champagne", es: "champán" },
      items: [
        {
          name: "Moët & Chandon",
          type: "Brut Impérial",
          location: "Champagne, France",
          description: {
            en: "enchanting and lively, characterized by a sparkling bouquet of green apple, citrus fruit, and delicate white flowers. Its palate reveals fine bubbles, refreshing notes of lemon, and subtle hints of nuttiness, offering a captivating blend of flavors",
            es: "encantador y vivaz, caracterizado por un brillante ramo de manzana verde, cítricos y delicadas flores blancas. Su paladar revela burbujas finas, notas refrescantes de limón y sutiles toques de frutos secos, ofreciendo una cautivadora mezcla de sabores",
          },
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
          description: {
            en: "traditional fortified wine made from red Grenache grapes and 21 herbs",
            es: "vino generoso de garnacha tinta y 21 hierbas",
          },
          sizes: { glass: 5, bottle: 20 },
        },
      ],
    },
    rosé: {
      items: [
        {
          name: "Mirabeau X",
          location: "Côtes de Provence, France",
          description: {
            en: "delicate dry notes of frangipane, vineyard peach and citrus. An airy and mouthwatering rosé and a great example of this stunning Provence appellation",
            es: "delicadas notas secas de frangipane, melocotón de viña y cítricos. Un rosado aireado y apetitoso y un gran ejemplo de esta impresionante denominación de Provenza",
          },
          sizes: { glass: 7, bottle: 26 },
        },
        {
          name: "The Pale",
          year: 2021,
          location: "Côtes de Provence, France",
          description: {
            en: "a delicious blend of Grenache, Cinsault, and Syrah that grow on the Mediterranean coast where the salty, sun-drenched soils give the wine a crisp yet fruity character",
            es: "una mezcla deliciosa de garnacha, cinsault y syrah que crecen en la costa mediterránea, donde la tierra salada y bañada por el sol le dan al vino un carácter seco pero afrutado",
          },
          sizes: { glass: 9, bottle: 33 },
        },
      ],
    },
  },
};
