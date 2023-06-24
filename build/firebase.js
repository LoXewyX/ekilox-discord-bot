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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig = {
    apiKey: "AIzaSyCL1BhcmbnMcB-TUx9z-Ck3Yy4_ZqpBHfA",
    authDomain: "ekilox.firebaseapp.com",
    projectId: "ekilox",
    storageBucket: "ekilox.appspot.com",
    messagingSenderId: "569727203183",
    appId: "1:569727203183:web:5cc4bb41363b4b6b279a9a",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, lite_1.getFirestore)(app);
function createTicket(threadId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, lite_1.addDoc)((0, lite_1.collection)(db, "tickets"), {
                threadId,
                text,
                openedAt: Date(),
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.createTicket = createTicket;
