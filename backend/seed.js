"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var Product_1 = require("./models/Product");
var Category_1 = require("./models/Category");
dotenv.config();
var PRODUCTS = [
    {
        id: "p1",
        name: "Nexus-X Ultra Pro",
        category: "Audio",
        price: 299.0,
        oldPrice: 349.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNazcWUeEIBM7XLWvyTLLwJz2NVtg3_ukhBVuMJibNFF4OHCON1s6Di47b9-CIViOZiSnLn6E5qUZa4tj8RlhLqw8coWL9k8Xx8hCiOFf4wFO9T6k8lZP0nUWIIlK4VDc4202Q6UAFz2wYzNKMKsFtGPtEGniisXQdOdBjYg3rdabtQj8WrRH4Ogl8nuCJAmocrbpm7MWDcnA711p3OmE1UwPoBtwxCQyDQYXJSM8gq1tzKHYnb6JRXMkXbJNs2JOZFT56r7pAdOw",
        description: "Experience precision sound with the new Nexus-X Ultra. Adaptive noise cancellation meets carbon acoustics.",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw1JFInFGq-iZH3zEQauE9UE13rM-OX0jRvJffaDFwMn8oH-0vVbLI-AQgeXDUc61ua1_bKm5bnNRVhR6UU8OM9WNiLnltY7DhM0Mw8q3y-nDlKz8G4Y02zaCixiEDrMk6hEUJJRazOnkbPD4b-USDmlcdZypurMO0Jxclzi6H6e9AfQsClIBxa0_QcYGJcp2MmHeR26xo89cMD2u6tF2VL3Nnk7-QRf40UbklXm80yG2a4UKFhiItKnKUF2MtEv24Vn-gHA1azAM",
        description: "The Nexus Watch Ultra X isn't just a wearable; it's a precision instrument built from aerospace-grade titanium.",
        rating: 4.8,
        reviews: 85,
        isNew: true,
    },
    {
        id: "p3",
        name: "Aura Studio Mini",
        category: "Audio",
        price: 189.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbpyNMDWpyLrd7ACT3rQNX3WUt_esLzDcDror3Kroita2nDDSLvTmN6uSPYxCtJt7zj9y9r9ZAw8upAELZjr3-FEKIzej1XQIjstQliANdSf3KXkkwg_dta9g2jaREN7nG8A93wLdIZ0vxSdTfJFDh1EJomAb3FigFNl9c16Er_fFfGzHT2n3tR-57CO6CzlS__enhALtLXdxO47scXwro3swBJRpnxPtCsWDICmypcTJ2Y-FCjnP7OC7crRMkNko-B7pAqAmwN34",
        description: "Compact high-fidelity studio monitoring headphones with transparent acoustics.",
        rating: 4.7,
        reviews: 94,
    },
    {
        id: "p4",
        name: "RGB Core TKL",
        category: "Gaming",
        price: 110.0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeKkSs4AMoRKUzrlmIM61uMkCeyQ0l8fEOfy5W93uk2aqf3Utd6Pgr5dQq4n08HKZeBE8HvoedxUeNYzkFVydgfMyi-TSEknxjyNWVi25rHeAcuHSLo5TfhjuE1heZH0HmAGNH4bKnzjfVpvcSrcF0iRbP0vwJwwZkbA9oGnKC5pup65Gxrz6wtg436ZCRrjiNhO9TEC97q4QVXAIMR2BL-TjUyaOtCmcqsCgsmT2YxJM75sUkJIUCihviaWBxLx0jQHCLoaPV1Rc",
        description: "Mechanical gaming keyboard with ultra-responsive switches and full RGB backlighting.",
        rating: 4.6,
        reviews: 210,
    },
];
var seedDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mongoUri, categoriesSet, categoriesToInsert, productsToInsert, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/nexus_store";
                return [4 /*yield*/, mongoose_1.default.connect(mongoUri)];
            case 1:
                _a.sent();
                console.log("MongoDB Connected for Seeding...");
                // Clear existing collections
                return [4 /*yield*/, Product_1.ProductModel.deleteMany({})];
            case 2:
                // Clear existing collections
                _a.sent();
                return [4 /*yield*/, Category_1.CategoryModel.deleteMany({})];
            case 3:
                _a.sent();
                console.log("Existing data cleared.");
                categoriesSet = new Set(PRODUCTS.map(function (p) { return p.category; }));
                categoriesToInsert = Array.from(categoriesSet).map(function (c) { return ({
                    name: c,
                }); });
                return [4 /*yield*/, Category_1.CategoryModel.insertMany(categoriesToInsert)];
            case 4:
                _a.sent();
                console.log("Categories seeded.");
                productsToInsert = PRODUCTS.map(function (p) { return ({
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
                }); });
                return [4 /*yield*/, Product_1.ProductModel.insertMany(productsToInsert)];
            case 5:
                _a.sent();
                console.log("Products seeded.");
                console.log("Seeding completed successfully!");
                process.exit(0);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error during seeding:", error_1);
                process.exit(1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
seedDB();
