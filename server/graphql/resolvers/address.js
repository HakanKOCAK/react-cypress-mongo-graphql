import { createRequire } from "module";
import { getAddressesByUserId, createAddress, deleteAddress } from "../../helpers/address.js";
import { verifyAccessToken } from "../../helpers/auth.js";
import { getUserById } from "../../helpers/user.js";
const require = createRequire(import.meta.url);
const cities = require("../../addresses/cities.json");
const counties = require("../../addresses/counties.json");
const districts = require("../../addresses/districts.json");

const addressResolver = {
  //Return pre set cities
  cities: () => {
    return cities
  },

  //Return pre set counties
  counties: ({ city }) => {
    return counties[city];
  },

  //Return pre set districts
  districts: ({ city, county }) => {
    return districts[city][county];
  },

  //Get saved user addresses
  myAddresses: async (_args, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });


      const addresses = await getAddressesByUserId({ userId });

      return addresses;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  //Add a new address
  addAddress: async ({ address, city, county, district, flat, floor, title }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const newAddress = await createAddress({
        address,
        city,
        county,
        createdBy: userId,
        district,
        flat,
        floor,
        title
      });

      return newAddress;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  //Deletes an address
  deleteAddress: async ({ id }, { req, _ }) => {
    try {
      //Check if token exists 
      const token = req.headers['authorization'];
      if (!token) throw Error('authorizationDenied');

      //Verify token and if verified check user exists
      const userId = verifyAccessToken({ token });
      await getUserById({ userId });

      const deleted = await deleteAddress({ id });

      if (!deleted) throw Error('addressNotExists');

      return deleted.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export default addressResolver;