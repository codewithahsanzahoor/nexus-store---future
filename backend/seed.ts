import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { ProductModel } from "./models/Product";
import { CategoryModel } from "./models/Category";

dotenv.config();

const PRODUCTS = [
  {
    id: "p1",
    name: "Nexus-X Ultra Pro",
    category: "Audio",
    price: 299.0,
    oldPrice: 349.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNazcWUeEIBM7XLWvyTLLwJz2NVtg3_ukhBVuMJibNFF4OHCON1s6Di47b9-CIViOZiSnLn6E5qUZa4tj8RlhLqw8coWL9k8Xx8hCiOFf4wFO9T6k8lZP0nUWIIlK4VDc4202Q6UAFz2wYzNKMKsFtGPtEGniisXQdOdBjYg3rdabtQj8WrRH4Ogl8nuCJAmocrbpm7MWDcnA711p3OmE1UwPoBtwxCQyDQYXJSM8gq1tzKHYnb6JRXMkXbJNs2JOZFT56r7pAdOw",
    description:
      "Experience precision sound with the new Nexus-X Ultra. Adaptive noise cancellation meets carbon acoustics.",
    rating: 4.9,
    reviews: 128,
    isBestseller: true,
  },
  {
    id: "p2",
    name: "Nexus Watch Ultra X",
    category: "Wearables",
    price: 499.0,
    oldPrice: 599.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw1JFInFGq-iZH3zEQauE9UE13rM-OX0jRvJffaDFwMn8oH-0vVbLI-AQgeXDUc61ua1_bKm5bnNRVhR6UU8OM9WNiLnltY7DhM0Mw8q3y-nDlKz8G4Y02zaCixiEDrMk6hEUJJRazOnkbPD4b-USDmlcdZypurMO0Jxclzi6H6e9AfQsClIBxa0_QcYGJcp2MmHeR26xo89cMD2u6tF2VL3Nnk7-QRf40UbklXm80yG2a4UKFhiItKnKUF2MtEv24Vn-gHA1azAM",
    description:
      "The Nexus Watch Ultra X isn't just a wearable; it's a precision instrument built from aerospace-grade titanium.",
    rating: 4.8,
    reviews: 85,
    isNew: true,
  },
  {
    id: "p3",
    name: "Aura Studio Mini",
    category: "Audio",
    price: 189.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbpyNMDWpyLrd7ACT3rQNX3WUt_esLzDcDror3Kroita2nDDSLvTmN6uSPYxCtJt7zj9y9r9ZAw8upAELZjr3-FEKIzej1XQIjstQliANdSf3KXkkwg_dta9g2jaREN7nG8A93wLdIZ0vxSdTfJFDh1EJomAb3FigFNl9c16Er_fFfGzHT2n3tR-57CO6CzlS__enhALtLXdxO47scXwro3swBJRpnxPtCsWDICmypcTJ2Y-FCjnP7OC7crRMkNko-B7pAqAmwN34",
    description:
      "Compact high-fidelity studio monitoring headphones with transparent acoustics.",
    rating: 4.7,
    reviews: 94,
  },
  {
    id: "p4",
    name: "RGB Core TKL",
    category: "Gaming",
    price: 110.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeKkSs4AMoRKUzrlmIM61uMkCeyQ0l8fEOfy5W93uk2aqf3Utd6Pgr5dQq4n08HKZeBE8HvoedxUeNYzkFVydgfMyi-TSEknxjyNWVi25rHeAcuHSLo5TfhjuE1heZH0HmAGNH4bKnzjfVpvcSrcF0iRbP0vwJwwZkbA9oGnKC5pup65Gxrz6wtg436ZCRrjiNhO9TEC97q4QVXAIMR2BL-TjUyaOtCmcqsCgsmT2YxJM75sUkJIUCihviaWBxLx0jQHCLoaPV1Rc",
    description:
      "Mechanical gaming keyboard with ultra-responsive switches and full RGB backlighting.",
    rating: 4.6,
    reviews: 210,
  },
];

const seedDB = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/nexus_store";
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected for Seeding...");

    // Clear existing collections
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    console.log("Existing data cleared.");

    // Seed Categories
    const categoriesSet = new Set(PRODUCTS.map((p) => p.category));
    const categoriesToInsert = Array.from(categoriesSet).map((c) => ({
      name: c,
    }));
    await CategoryModel.insertMany(categoriesToInsert);
    console.log("Categories seeded.");

    // Seed Products
    const productsToInsert = PRODUCTS.map((p) => ({
      productId: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      oldPrice: p.oldPrice,
      image: p.image,
      description: p.description,
      rating: p.rating,
      reviews: p.reviews,
      isBestseller: p.isBestseller || false,
      isNew: p.isNew || false,
    }));
    await ProductModel.insertMany(productsToInsert);
    console.log("Products seeded.");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDB();
