import Address from "../models/Address.js";
import _ from "lodash";

export const getAddressesByUserId = async ({ userId = '' }) => {
  try {
    const addresses = await Address.find({ createdBy: userId });

    return addresses;
  } catch (error) {
    throw error;
  }
};

export const createAddress = async ({
  address = '',
  city = '',
  county = '',
  createdBy = '',
  district = '',
  flat = -1,
  floor = -1,
  title = ''
}) => {
  try {
    const newAddress = new Address({
      address,
      city,
      county,
      createdBy,
      district,
      flat,
      floor,
      title
    });

    await newAddress.save();

    return newAddress;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async ({ id }) => {
  try {
    const deleted = await Address.findByIdAndDelete(id);

    return deleted;
  } catch (error) {
    throw error;
  }
}
