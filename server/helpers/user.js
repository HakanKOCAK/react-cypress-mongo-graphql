import User from "../models/User.js";
import Address from "../models/Address.js";
import CreditCard from "../models/CreditCard.js";
import { hash } from "argon2";
import lodash from "lodash";
import { createUserCart } from "./cart.js";
import { createTestOrders } from "./order.js";

export const createTestUser = async () => {
    try {
        //Check if test user exists and create account
        const testUser = await User.find({ email: 'testaccount@test.com' });
        if (lodash.isEmpty(testUser)) {
            const user = createUser({
                name: "Test",
                surname: "Account",
                email: "testaccount@test.com",
                password: await hash('123456')
            })

            //Create test user cart
            const cart = createUserCart({ userId: user._id });

            //Create default addresses
            const userAddresses1 = new Address({
                address: 'Home address',
                city: 'Istanbul',
                county: 'Besiktas',
                district: 'Bebek',
                flat: 2,
                floor: 3,
                title: 'home',
                createdBy: user._id
            });

            const userAddresses2 = new Address({
                address: 'Other address',
                city: 'Ankara',
                county: 'Cankaya',
                district: 'Bahcelievler',
                flat: 2,
                floor: 3,
                title: 'other',
                createdBy: user._id
            });

            const userAddresses3 = new Address({
                address: 'No restaurant address',
                city: 'Konya',
                county: 'Selcuklu',
                district: 'Yazir',
                flat: 2,
                floor: 3,
                title: 'home',
                createdBy: user._id
            });

            //Create default credit cards
            const userCreditCard1 = new CreditCard({
                createdBy: user._id,
                cvc: 111,
                description: 'My Visa Card',
                expiry: '12/25',
                holder: 'Test Account',
                issuer: 'visa',
                number: '1111111111111111'
            });

            const userCreditCard2 = new CreditCard({
                createdBy: user._id,
                cvc: 222,
                description: 'My Mastercard',
                expiry: '12/25',
                holder: 'Test Account',
                issuer: 'mastercard',
                number: '2222222222222222'
            });

            await CreditCard.create([userCreditCard1, userCreditCard2]);
            await Address.create([userAddresses1, userAddresses2, userAddresses3]);
            await user.save();
            await cart.save();
            await createTestOrders(user._id);
            console.log('Test user created');
        }
    } catch (error) {
        console.log(error);
        throw Error('internalServerError');
    }
};

export const createUser = ({ name = '', surname = '', email = '', password = '' }) => new User({ name, surname, email, password });

export const getUserByEmail = async ({ email = '' }) => {
    try {
        const users = await User.find({ email });

        if (lodash.isEmpty(users)) {
            throw new Error('invalidCredentials');
        }

        return users[0];
    } catch (error) {
        throw error;
    }
};

export const getUserById = async ({ userId = '' }) => {
    try {
        const user = await User.findById(userId);

        if (lodash.isEmpty(user)) {
            throw new Error('userDoesNotExist');
        }

        return user;
    } catch (error) {
        throw error;
    }
};
