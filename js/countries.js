const COUNTRIES = [
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "🇮🇳",
    states: [
      "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
      "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
      "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
      "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
      "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
      "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
      "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
    ]
  },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
    states: [
      "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
      "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
      "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
      "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
      "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
      "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
      "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
      "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
      "Washington D.C."
    ]
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "🇬🇧",
    states: [
      "England","Scotland","Wales","Northern Ireland",
      "Greater London","South East England","South West England","East of England",
      "East Midlands","West Midlands","Yorkshire and the Humber",
      "North West England","North East England"
    ]
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "🇨🇦",
    states: [
      "Alberta","British Columbia","Manitoba","New Brunswick",
      "Newfoundland and Labrador","Northwest Territories","Nova Scotia",
      "Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"
    ]
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "🇦🇺",
    states: [
      "Australian Capital Territory","New South Wales","Northern Territory",
      "Queensland","South Australia","Tasmania","Victoria","Western Australia"
    ]
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: "🇩🇪",
    states: [
      "Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg",
      "Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia",
      "Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt",
      "Schleswig-Holstein","Thuringia"
    ]
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "🇫🇷",
    states: [
      "Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Bretagne","Centre-Val de Loire",
      "Corse","Grand Est","Hauts-de-France","Île-de-France","Normandie",
      "Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"
    ]
  },
  {
    name: "Japan",
    code: "JP",
    dialCode: "+81",
    flag: "🇯🇵",
    states: [
      "Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima",
      "Gifu","Gunma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa",
      "Iwate","Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto",
      "Mie","Miyagi","Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita",
      "Okayama","Okinawa","Osaka","Saga","Saitama","Shiga","Shimane",
      "Shizuoka","Tochigi","Tokushima","Tokyo","Tottori","Toyama","Wakayama",
      "Yamagata","Yamaguchi","Yamanashi"
    ]
  },
  {
    name: "China",
    code: "CN",
    dialCode: "+86",
    flag: "🇨🇳",
    states: [
      "Anhui","Beijing","Chongqing","Fujian","Gansu","Guangdong","Guangxi",
      "Guizhou","Hainan","Hebei","Heilongjiang","Henan","Hong Kong","Hubei",
      "Hunan","Inner Mongolia","Jiangsu","Jiangxi","Jilin","Liaoning","Macau",
      "Ningxia","Qinghai","Shaanxi","Shandong","Shanghai","Shanxi","Sichuan",
      "Tianjin","Tibet","Xinjiang","Yunnan","Zhejiang"
    ]
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "🇧🇷",
    states: [
      "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal",
      "Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul",
      "Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí",
      "Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia",
      "Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins"
    ]
  },
  {
    name: "South Africa",
    code: "ZA",
    dialCode: "+27",
    flag: "🇿🇦",
    states: [
      "Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo",
      "Mpumalanga","North West","Northern Cape","Western Cape"
    ]
  },
  {
    name: "Nigeria",
    code: "NG",
    dialCode: "+234",
    flag: "🇳🇬",
    states: [
      "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
      "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja",
      "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
      "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
      "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
    ]
  },
  {
    name: "Pakistan",
    code: "PK",
    dialCode: "+92",
    flag: "🇵🇰",
    states: [
      "Azad Kashmir","Balochistan","Gilgit-Baltistan","Islamabad Capital Territory",
      "Khyber Pakhtunkhwa","Punjab","Sindh"
    ]
  },
  {
    name: "Bangladesh",
    code: "BD",
    dialCode: "+880",
    flag: "🇧🇩",
    states: [
      "Barisal","Chittagong","Dhaka","Khulna","Mymensingh","Rajshahi","Rangpur","Sylhet"
    ]
  },
  {
    name: "Sri Lanka",
    code: "LK",
    dialCode: "+94",
    flag: "🇱🇰",
    states: [
      "Central","Eastern","North Central","North Western","Northern",
      "Sabaragamuwa","Southern","Uva","Western"
    ]
  },
  {
    name: "Nepal",
    code: "NP",
    dialCode: "+977",
    flag: "🇳🇵",
    states: [
      "Bagmati","Gandaki","Karnali","Koshi","Lumbini","Madhesh","Sudurpashchim"
    ]
  },
  {
    name: "Singapore",
    code: "SG",
    dialCode: "+65",
    flag: "🇸🇬",
    states: ["Central Region","East Region","North Region","North-East Region","West Region"]
  },
  {
    name: "Malaysia",
    code: "MY",
    dialCode: "+60",
    flag: "🇲🇾",
    states: [
      "Johor","Kedah","Kelantan","Kuala Lumpur","Labuan","Melaka","Negeri Sembilan",
      "Pahang","Perak","Perlis","Pulau Pinang","Putrajaya","Sabah","Sarawak","Selangor","Terengganu"
    ]
  },
  {
    name: "UAE",
    code: "AE",
    dialCode: "+971",
    flag: "🇦🇪",
    states: [
      "Abu Dhabi","Ajman","Dubai","Fujairah","Ras Al Khaimah","Sharjah","Umm Al Quwain"
    ]
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "🇸🇦",
    states: [
      "Al Bahah","Al Jawf","Al Madinah","Al Qassim","Asir","Eastern Province",
      "Ha'il","Jazan","Makkah","Najran","Northern Borders","Riyadh","Tabuk"
    ]
  }
];
