
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

U2FsdGVkX1/iYZvwn0q+NkjTAKy94RGBGoXnE9oUuVrVJ7O1+IGLLx+STYji9Qya+BDVvSzyNyy89JB7gDqVGI2VlHDl73ZYYcQUaCsLSEhXEBBOzovtYkru2FVxlVlhXo6TgDpLLqbJ+K+0KXSHwa+jCKxU465+jHS9DlqbCLagM7586tzE5S4O/jMODIaXS9F0ev2fRDeGohGD+lhhYi14naxMTgyLBcbjufEhZgpAn2pOSY3VSmRhbYCjfoM/z+8VprWoVKw+LOHLNQnqVifk53JI+6KVcdId8tXmqgKyGHJk/ObMpcAuiNrQPVi3xhN3kTINSMKExLOs8LvwzGuJATGPoWgY9jI1MLcPuT+ciBUQPJozik/PubxB2xORgHd192Sz3555igjhrllRGyPtSMZ7mWMJ52TQwfG1kq6xmntlzzIMH3nd8IOppa9N99PPF6PkeZKruYJW1MZhwA==
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);