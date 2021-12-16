import CreditCard from "../models/CreditCard.js";
import _ from "lodash";

//To return card number as ************3333
export const maskNumber = (val) => {
  const len = val.toString().length
  const arr = new Array(len - 4);
  arr.fill('*');
  const lastFour = val.slice(len - 4, len).split('');

  return [...arr, ...lastFour].join('');
};

export const getCreditCardsByUserId = async ({ userId = '' }) => {
  try {
    const cards = await CreditCard.find({ createdBy: userId });

    return cards;
  } catch (error) {
    throw error;
  }
};

export const createCreditCard = async ({
  createdBy = '',
  cvc = 0,
  expiry = '',
  description = '',
  holder = '',
  issuer = '',
  number = 0
}) => {
  try {
    const newCreditCard = new CreditCard({
      createdBy,
      cvc,
      description,
      expiry,
      holder,
      issuer,
      number
    });

    await newCreditCard.save();

    return newCreditCard;
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async ({ id = '' }) => {
  try {
    const deleted = await CreditCard.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw error;
  }
}