export interface Product {
  _id?: string;
  image: string;
  name: string;
  description: string;
  price: number;
  details1: string;
  details2: string;
  details3: string;
  size: string;
  color: string;
  inStock: number;
  category: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export const generateId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters.charAt(Math.floor(Math.random() * letters.length));
  const secondLetter = letters.charAt(
    Math.floor(Math.random() * letters.length)
  );
  const numbers = Math.floor(10 + Math.random() * 10000);
  const newId = letter + secondLetter + numbers.toString();
  return newId;
};

export const products: Product[] = [
  {
    id: 'EL1477',
    image: '../images/aberdeen.png',
    title: 'Aberdeen',
    description:
      "In Gårda - in Gothenburg's old textile worker and factory quarter - the idea was born to resume the proud hat production that once characterized the area, when Scots, Dutch and English businessmen and skilled craftsmen came to characterize manufacturing and production a little over a century ago, in this part of town. It is no longer possible to produce the hats in central Gothenburg, as it was a couple of centuries ago, but we can and allow ourselves to be inspired, fascinated and enthralled by the design and innovation of the vibrant craftsmanship that marked the area back then. And take it with us when today, 200 years later, we visit our friends and producers of genuine Panama hats far to the west - in South American Ecuador - or to the boundless artistic Japan in the far east.",
    price: 69,
    details1: '12 centimeter crown.',
    details2: '6.5 centimeter brim',
    details3: 'Made of 100 percent wool.',
    size: 'L',
    color: 'Dark brown',
    inStock: 1,
    categories: [''],
  },
  {
    id: 'FD9263',
    image: '../images/bowler.png',
    title: 'Bowler',
    description:
      'British Jaxon supplies hats with premium craftmanship and we can only state that they succeed in this. When you buy a hat from Jaxon, you get quality, fashion and an unbeatable price. Are you looking for one or more hats? Then you have to try a Jaxon!',
    price: 129,
    details1: '11,5 centimeters crown.',
    details2: '5 centimeters wide.',
    details3: 'Made from 100 percent wool felt.',
    size: 'M',
    color: 'Black',
    inStock: 1,
    categories: [],
  },
  {
    id: 'XA9333',
    image: '../images/panama.png',
    title: 'Panama',
    description:
      "From Bavaria in southern Germany, near the border with Switzerland and Lichtenstein, comes the German hat brand. We dare not promise that a hat from Faustmann is for life, but what we can promise is that with a Faustmann you get an extremely affordable hat. Hats from Faustmann are of high quality and the price is extremely low in relation to the high quality. The design of Faustmann's hats is characterized by both creativity and the classic look. A very popular hat for all ages.",
    price: 119,
    details1: '12.5 centimeter crown.',
    details2: '6 centimeter brim',
    details3: 'Made from 100 percent Panama straw.',
    size: 'M',
    color: 'Beige',
    inStock: 1,
    categories: [],
  },
  {
    id: 'QF8822',
    image: '../images/outback.png',
    title: 'Outback',
    description:
      "MJM - M.J. Michaelsen - is Denmark's most classic, exclusive hat brand, founded in 1829. MJM captures the city, the sea, the countryside, the wilderness and with classic Danish craftsmanship, Danish tradition and design, MJM creates Denmark's most popular hat - year after year.",
    price: 139,
    details1: '11 centimeter crown.',
    details2: '6 centimeter brim',
    details3: 'Made from 100 percent cotton.',
    size: 'M',
    color: 'Black',
    inStock: 1,
    categories: [],
  },
  {
    id: 'PP2226',
    image: '../images/stockman.png',
    title: 'Stockman',
    description:
      "Australia is a country like no other. Welcome to the land where dreams begin, where the call of white cockatoos sets the tone for the morning and the kangaroo's leap towards an orange-yellow sunset dresses the evening. Endless horizons, dense tropical rainforest, red, dry, earth, sun drenched coastlines that stretch as far as the eye can see. Founded in 1969, Jacarus hats reflect the soul that is Australia - wild, untamed, strong and brave!",
    price: 95,
    details1: '10 centimeter crown.',
    details2: '7 centimeter brim',
    details3: 'Made from 100 percent buffalo leather.',
    size: 'S',
    color: 'Brown',
    inStock: 1,
    categories: [],
  },
  {
    id: 'ZK6932',
    image: '../images/straw.png',
    title: 'Straw',
    description:
      'British Jaxon supplies hats quality hats and we can only state that they succeed in this. When you buy a hat from Jaxon, you get quality, fashion and an unbeatable price. Are you looking for one or more hats? Then you have to try a Jaxon!',
    price: 79,
    details1: '11,5 centimeter crown.',
    details2: '7.5 centimeter brim',
    details3: 'Made from 100 percent raffia straw.',
    size: 'M',
    color: 'Straw hat colored',
    inStock: 1,
    categories: [],
  },
  {
    id: 'YG1824',
    image: '../images/western.png',
    title: 'Western',
    description:
      "Elegant Western hat in Stetsons Woolfelt with Asahi Guard® which makes the hat extremely water-repellent and resistant to both dirt and rain. The material is durable and keeps its shape even if you pack the hat in your bag when you're on the move. Since its inception in 1865, Stetson Hats has been the number 1 premium brand on the American market. For over 150 years, no manufacturer has created finer hats at a better price than Stetson. Quality and class right through.",
    price: 119,
    details1: '7 centimeter crown.',
    details2: '12 centimeter brim',
    details3: 'Made from 100 percent wool felt (Asahi Guard).',
    size: 'L',
    color: 'Brown',
    inStock: 1,
    categories: [],
  },
  {
    id: 'OW5885',
    image: '../images/tophat.png',
    title: 'Top Hat',
    description:
      'British Jaxon supplies hats quality hats and we can only state that they succeed in this. When you buy a hat from Jaxon, you get quality, fashion and an unbeatable price. Are you looking for one or more hats? Then you have to try a Jaxon!',
    price: 129,
    details1: '15 centimeter crown.',
    details2: '5 centimeter brim',
    details3: 'Made from 100 percent wool felt.',
    size: 'L',
    color: 'Black',
    inStock: 1,
    categories: [],
  },
  {
    id: 'RS2937',
    image: '../images/trilby.png',
    title: 'Trilby',
    description:
      'Since its inception in 1865, Stetson Hats has been the number 1 premium brand on the American market. For over 150 years, no manufacturer has created finer hats at a better price than Stetson. Quality and class right through.',
    price: 109,
    details1: '9.5 centimeter crown.',
    details2: '4.5 centimeter brim',
    details3: 'Made of 75 percent wool and 25 percent polyamide.',
    size: 'S',
    color: 'Black',
    inStock: 1,
    categories: [],
  },
  {
    id: 'UF1283',
    image: '../images/woolfelt.png',
    title: 'Woolfelt',
    description:
      'The Stetson Player is a variation on the trilby and the pork pie hat with a narrow straight brim with a slightly turned up brim. The hat is made of a luxurious felted wool with very high water repellency that withstands both rain and snowfall.',
    price: 109,
    details1: '11 centimeter crown.',
    details2: '4.5 centimeter brim',
    details3: 'Made from 100 percent wool felt (Asahi Guard).',
    size: 'M',
    color: 'Dark gray',
    inStock: 1,
    categories: [],
  },
  {
    id: 'IP9642',
    image: '../images/fedora.png',
    title: 'Fedora',
    description:
      'British Jaxon supplies hats quality hats and we can only state that they succeed in this. When you buy a hat from Jaxon, you get quality, fashion and an unbeatable price. Are you looking for one or more hats? Then you have to try a Jaxon!',
    price: 59,
    details1: '10 centimeter crown.',
    details2: '6.5 centimeter brim',
    details3: 'Made from 100 percent wool felt.',
    size: 'M',
    color: 'Red',
    inStock: 1,
    categories: [],
  },
  {
    id: 'KZ0032',
    image: '../images/stoutmoss.png',
    title: 'Stout',
    description:
      "Brixton is the young company that has quickly become one of the coolest and most sought-after hat brands in the world. The design and purity of each model is impossible to copy. And the unique way that Brixton takes on the classic styles of a hat means that with a Brixton on your head, you're guaranteed to stand out from the crowd!",
    price: 69,
    details1: '4 centimeter crown.',
    details2: '10 centimeter brim',
    details3: 'Made from 100 percent wool felt.',
    size: 'L',
    color: 'Gray',
    inStock: 1,
    categories: [],
  },
];
