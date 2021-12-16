import { verifyAccessToken } from "../../helpers/auth.js";
import {
  getCreditCardsByUserId,
  createCreditCard,
  deleteCard,
  maskNumber
} from "../../helpers/creditCard.js";
import { getUserById } from "../../helpers/user.js";

const creditCardResolver = {
  //Get saved user cards
  myCreditCards: async (_args, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const cards = await getCreditCardsByUserId({ userId });

      return cards.map((card) => ({
        createdBy: card.createdBy,
        description: card.description,
        issuer: card.issuer,
        id: card.id,
        number: maskNumber(card.number)
      }));

    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  //Create a new card
  addCreditCard: async ({ cardNumber, cardHolder, cvc, expiry, description, issuer }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const newCreditCard = await createCreditCard({
        createdBy: userId,
        cvc,
        description,
        expiry,
        holder: cardHolder,
        issuer,
        number: cardNumber
      });

      return {
        id: newCreditCard.id,
        createdBy: newCreditCard.createdBy,
        description: newCreditCard.description,
        issuer: newCreditCard.issuer,
        number: maskNumber(newCreditCard.number)
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  //Delete a credit card
  deleteCreditCard: async ({ id }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const deleted = await deleteCard({ id });

      if (!deleted) throw Error('cardNotExists');

      return deleted.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default creditCardResolver;
