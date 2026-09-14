import biryani from "@/assets/foods/biryani.jpg";
import pizza from "@/assets/foods/pizza.jpg";
import burger from "@/assets/foods/burger.jpg";
import dosa from "@/assets/foods/dosa.jpg";
import paneerTikka from "@/assets/foods/paneer-tikka.jpg";
import chole from "@/assets/foods/chole.jpg";
import momos from "@/assets/foods/momos.jpg";
import pasta from "@/assets/foods/pasta.jpg";
import gulabJamun from "@/assets/foods/gulab-jamun.jpg";
import noodles from "@/assets/foods/noodles.jpg";

export type Food = {
  id: number;
  name: string;
  desc: string;
  price: number;
  rating: number;
  time: string;
  veg: boolean;
  category: string;
  image: string;
  bestseller?: boolean;
};

export const CATEGORIES = [
  "All",
  "Biryani",
  "Pizza",
  "Burgers",
  "South Indian",
  "North Indian",
  "Chinese",
  "Italian",
  "Desserts",
] as const;

export const FOODS: Food[] = [
  // Biryani
  { id: 1, name: "Chicken Dum Biryani", desc: "Slow-cooked basmati with saffron, mint & fried onions", price: 249, rating: 4.5, time: "35 min", veg: false, category: "Biryani", image: biryani, bestseller: true },
  { id: 2, name: "Hyderabadi Mutton Biryani", desc: "Tender mutton layered with aromatic long-grain rice", price: 349, rating: 4.6, time: "40 min", veg: false, category: "Biryani", image: biryani },
  { id: 3, name: "Veg Biryani", desc: "Garden veggies, whole spices & saffron basmati", price: 189, rating: 4.2, time: "30 min", veg: true, category: "Biryani", image: biryani },
  { id: 4, name: "Egg Biryani", desc: "Masala roasted eggs folded into fragrant dum rice", price: 169, rating: 4.1, time: "30 min", veg: false, category: "Biryani", image: biryani },
  // Pizza
  { id: 5, name: "Margherita Pizza", desc: "Wood-fired crust, fresh mozzarella & basil", price: 199, rating: 4.4, time: "25 min", veg: true, category: "Pizza", image: pizza, bestseller: true },
  { id: 6, name: "Farmhouse Pizza", desc: "Loaded with capsicum, onion, mushroom & sweet corn", price: 299, rating: 4.5, time: "28 min", veg: true, category: "Pizza", image: pizza },
  { id: 7, name: "Pepperoni Pizza", desc: "Spicy pepperoni, double cheese & oregano", price: 349, rating: 4.6, time: "28 min", veg: false, category: "Pizza", image: pizza },
  { id: 8, name: "Cheese Burst Pizza", desc: "Liquid cheese core with gooey mozzarella top", price: 279, rating: 4.3, time: "25 min", veg: true, category: "Pizza", image: pizza },
  // Burgers
  { id: 9, name: "Classic Cheeseburger", desc: "Grilled patty, cheddar, lettuce & house sauce", price: 149, rating: 4.4, time: "20 min", veg: false, category: "Burgers", image: burger, bestseller: true },
  { id: 10, name: "Veggie Crunch Burger", desc: "Crispy veg patty, chipotle mayo & fresh slaw", price: 99, rating: 4.1, time: "18 min", veg: true, category: "Burgers", image: burger },
  { id: 11, name: "Double Patty Burger", desc: "Two juicy patties, double cheese & caramelised onions", price: 219, rating: 4.5, time: "22 min", veg: false, category: "Burgers", image: burger },
  { id: 12, name: "Paneer Tikka Burger", desc: "Smoky paneer patty with mint mayo in brioche", price: 139, rating: 4.2, time: "20 min", veg: true, category: "Burgers", image: burger },
  // South Indian
  { id: 13, name: "Masala Dosa", desc: "Golden crispy dosa with spiced potato filling", price: 119, rating: 4.6, time: "20 min", veg: true, category: "South Indian", image: dosa, bestseller: true },
  { id: 14, name: "Idli Sambar (4 pc)", desc: "Soft steamed idlis with hot sambar & chutney", price: 79, rating: 4.3, time: "15 min", veg: true, category: "South Indian", image: dosa },
  { id: 15, name: "Mysore Rava Dosa", desc: "Crisp semolina dosa with fiery garlic chutney", price: 139, rating: 4.4, time: "22 min", veg: true, category: "South Indian", image: dosa },
  { id: 16, name: "Medu Vada (4 pc)", desc: "Fluffy fried vadas, sambar & coconut chutney", price: 89, rating: 4.2, time: "15 min", veg: true, category: "South Indian", image: dosa },
  // North Indian
  { id: 17, name: "Paneer Tikka Masala", desc: "Char-grilled paneer in rich tomato-cashew gravy", price: 229, rating: 4.5, time: "30 min", veg: true, category: "North Indian", image: paneerTikka, bestseller: true },
  { id: 18, name: "Chole Bhature", desc: "Fluffy bhature with spicy Amritsari chole", price: 129, rating: 4.4, time: "25 min", veg: true, category: "North Indian", image: chole },
  { id: 19, name: "Butter Chicken", desc: "Tandoori chicken in creamy makhani gravy", price: 279, rating: 4.7, time: "32 min", veg: false, category: "North Indian", image: paneerTikka },
  { id: 20, name: "Dal Makhani + Naan", desc: "Slow-simmered black dal with 2 butter naans", price: 189, rating: 4.3, time: "28 min", veg: true, category: "North Indian", image: chole },
  { id: 21, name: "Rajma Chawal", desc: "Homestyle kidney-bean curry over steamed rice", price: 139, rating: 4.2, time: "25 min", veg: true, category: "North Indian", image: chole },
  // Chinese
  { id: 22, name: "Chicken Momos (8 pc)", desc: "Steamed momos with fiery red chutney", price: 129, rating: 4.4, time: "20 min", veg: false, category: "Chinese", image: momos, bestseller: true },
  { id: 23, name: "Veg Hakka Noodles", desc: "Wok-tossed noodles, peppers & spring onion", price: 149, rating: 4.3, time: "22 min", veg: true, category: "Chinese", image: noodles },
  { id: 24, name: "Chilli Chicken", desc: "Crispy chicken tossed in garlic-chilli glaze", price: 219, rating: 4.5, time: "25 min", veg: false, category: "Chinese", image: momos },
  { id: 25, name: "Veg Manchurian", desc: "Veg dumplings in a soy-garlic gravy", price: 169, rating: 4.2, time: "25 min", veg: true, category: "Chinese", image: noodles },
  { id: 26, name: "Schezwan Fried Rice", desc: "Smoky fried rice with schezwan kick", price: 159, rating: 4.1, time: "22 min", veg: true, category: "Chinese", image: noodles },
  // Italian
  { id: 27, name: "Alfredo Pasta", desc: "Fettuccine in creamy parmesan sauce", price: 229, rating: 4.5, time: "25 min", veg: true, category: "Italian", image: pasta, bestseller: true },
  { id: 28, name: "Arrabbiata Pasta", desc: "Penne in spicy tomato-basil sauce", price: 209, rating: 4.3, time: "24 min", veg: true, category: "Italian", image: pasta },
  { id: 29, name: "Garlic Breadsticks", desc: "Cheesy baked breadsticks with herb butter", price: 109, rating: 4.2, time: "15 min", veg: true, category: "Italian", image: pizza },
  // Desserts
  { id: 30, name: "Gulab Jamun (4 pc)", desc: "Warm khoya dumplings in saffron syrup", price: 89, rating: 4.6, time: "15 min", veg: true, category: "Desserts", image: gulabJamun, bestseller: true },
  { id: 31, name: "Rasmalai (2 pc)", desc: "Soft chenna discs in chilled saffron milk", price: 99, rating: 4.5, time: "15 min", veg: true, category: "Desserts", image: gulabJamun },
  { id: 32, name: "Chocolate Brownie", desc: "Fudgy brownie with a molten chocolate core", price: 119, rating: 4.4, time: "15 min", veg: true, category: "Desserts", image: gulabJamun },
];
