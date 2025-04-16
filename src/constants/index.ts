export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const rent_fee = 1.11;

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const models = [
  {
    title: "Todos",
    value: "",
  },
  {
    title: "4x4",
    value: "4x4",
  },
  {
    title: "Executivo",
    value: "executivo",
  },
  {
    title: "Econômico",
    value: "econômico",
  },
];

export const footerLinks = [
  {
    title: "Informações",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  // {
  //   title: "Company",
  //   links: [
  //     { title: "Events", url: "/" },
  //     { title: "Blog", url: "/" },
  //     { title: "Podcast", url: "/" },
  //     { title: "Invite a friend", url: "/" },
  //   ],
  // },
  // {
  //   title: "Socials",
  //   links: [
  //     { title: "Discord", url: "/" },
  //     { title: "Instagram", url: "/" },
  //     { title: "Twitter", url: "/" },
  //     { title: "Facebook", url: "/" },
  //   ],
  // },
];

// Infos

export const infos = {
  wpp: "7391910313",
  phone: "(73) 30173028 / 991910313",
  address: "R. David Maia, 246 - Pontal",
  intro: "Locadora de carros em Ilhéus",
  intro_sub: "Estamos localizados em frente ao aeroporto de Ilhéus",
};

export const wpp_link = (wpp: string) => {
  return `https://wa.me//${wpp}?text=Tenho%20interesse%20em%20alugar%20seu%20carro`;
};

export const wpp_link_dev = `https://wa.me//${73991089974}`;

export const hours_rent = [
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];
