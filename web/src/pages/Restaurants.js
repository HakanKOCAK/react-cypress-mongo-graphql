import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Center,
    Heading,
    Spinner,
    Flex,
    HStack,
    Button,
    Icon,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption
} from '@chakra-ui/react';
import { useLazyQuery, useQuery } from '@apollo/client'
import { getRestaurantsQuery, myAddresses } from '../graphql/queries';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import Address from '../components/Address/Address';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AddressModal from '../components/Modals/AddressList';
import { isEmpty, get, cloneDeep } from 'lodash';
import RestaurantListItem from '../components/Restaurant/ListItem';
import RestaurantFilter from '../components/Modals/Restaurant/Filter';

//Page that user is redirected after authentication
const Restaurants = () => {
    const { t } = useTranslation();

    //Filter modal options
    const defaultFilters = useMemo(() => {
        return {
            cuisineFilters: {
                Falafel: false,
                Hamburger: false,
                Kebab: false,
                Pizza: false
            },
            minAmount: 0,
            maxArrival: 60
        }
    }, []);
    const [sortBy, setSortBy] = useState('');
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    //Selected address details
    const [selectedAddress, setSelectedAddress] = useState({
        address: '',
        city: '',
        county: '',
        district: '',
        flat: 0,
        floor: 0,
        id: '',
        title: ''
    });

    //Get saved addresses of user
    const { data, error, loading } = useQuery(myAddresses);
    const [isModalOpen, setModalOpen] = useState(false);

    //Get restaurants lazy query -> will be triggered on address change
    const [filters, setFilters] = useState([]);
    const [getRestaurants, { data: restaurantData, loading: fetchingRestaurants }] = useLazyQuery(getRestaurantsQuery);
    const [restaurantList, setRestaurantList] = useState([]);
    const [toDisplay, setToDisplay] = useState([]);

    const clearFilters = () => {
        setFilters([]);
    };

    const applySorts = (list, sortBy) => {
        //Sort by value will be like name-asc etc. so split by '-' first element will be the key 
        //and second element will be the order
        const splitted = sortBy.split('-');
        const key = splitted[0];
        const order = splitted[1];

        const getValue = (key, value) => {
            //parse value to integer if its minimum basket amount or estimated delivery time 
            //for healthy comparison
            if (key === 'deliveryDetails.estimatedDeliveryTime') {
                return parseInt(value);
            } else if (key === 'deliveryDetails.minAmount') {
                return parseInt(value.split('$')[0]);
            }

            return value;
        }

        const sorted = cloneDeep(list).sort((a, b) => {
            //get function comes from lodash and it allows to get a value from an object.
            // for example in this case our object is restaurant = {
            //     ...
            //     deliveryDetails: {
            //         minAmount: '10$',
            //         estimatedDeliveryTime: '40'
            //     }
            // } 
            // so we can get the min amount like this: get(restaurant, 'deliveryDetails.minAmount')
            if (getValue(key, get(a, key)) > getValue(key, get(b, key))) {
                //reverse it if descending
                if (order === 'desc') {
                    return -1;
                }
                return 1
            };

            if (getValue(key, get(a, key)) < getValue(key, get(b, key))) {
                //reverse it if descending
                if (order === 'desc') {
                    return 1;
                }
                return -1
            };

            return 0;
        })

        setToDisplay(sorted);
    };

    useEffect(() => {
        if (sortBy) {
            applySorts(restaurantList, sortBy)
        } else {
            setToDisplay(restaurantList);
        }
    }, [sortBy, restaurantList]);

    useEffect(() => {
        //Check if any filters applied
        if (!isEmpty(filters)) {
            setIsFiltered(true);
            const filtered = cloneDeep(restaurantList).filter((r) => {
                //To check if satisfies the given filter
                let result = true;

                //Parse minimum basket amount or estimated delivery time of restaurant to integer.
                const minAmountOfRestaurant = parseInt(r.deliveryDetails.minAmount.split('$')[0]);
                const maxArrivalOfRestaurant = parseInt(r.deliveryDetails.estimatedDeliveryTime);

                //Using every here to escape if not satisfies
                filters.every((opt) => {
                    //If filter option is cuisine
                    if (opt.filterBy === 'cuisine') {
                        const applyFilters = [];

                        //Example filterValue = { Pizza: false }
                        Object.entries(opt.filterValue).forEach(([key, value]) => {
                            if (value) {
                                applyFilters.push(key);
                            }
                        });
                        //Check if requested cuisine exists in restaurant cuisine
                        if (!(r.cuisine.some((c) => applyFilters.indexOf(c) >= 0))) {
                            result = false
                        }
                    } else if (opt.filterBy === 'minAmount') {
                        //Check if restaurant's min basket amount is lower or equals to desired amount 
                        if (!(minAmountOfRestaurant <= parseInt(opt.filterValue))) {
                            result = false;
                        }
                    } else if (opt.filterBy === 'maxArrival') {
                        //Check if restaurant's estimated delivery time is lower or equals to desired delivery time 
                        if (!(maxArrivalOfRestaurant <= parseInt(opt.filterValue))) {
                            result = false;
                        }
                    }

                    return result;
                })

                return result;
            });

            if (sortBy) {
                applySorts(filtered, sortBy);
            } else {
                setToDisplay(filtered);
            }
        } else {
            //If not set is filtered to false and set default restaurant list
            setIsFiltered(false);
            if (sortBy) {
                applySorts(restaurantList, sortBy);
            } else {

                setToDisplay(restaurantList);
            }
        }
    }, [filters, setToDisplay, restaurantList, sortBy]);

    useEffect(() => {
        //Check if an address is saved to local storage before and if so check if user still have the address
        const lastAddress = localStorage.getItem('fooder.last.address');
        if (lastAddress && !isEmpty(data)) {
            setSelectedAddress(data.myAddresses.find((a) => a.id === lastAddress) || {});
        }
    }, [setSelectedAddress, data]);

    useEffect(() => {
        //Query restaurant on address change
        if (!isEmpty(selectedAddress) && selectedAddress.id) {
            getRestaurants({
                variables: {
                    city: selectedAddress.city,
                    county: selectedAddress.county,
                    district: selectedAddress.district,
                }
            });
        }
    }, [selectedAddress, getRestaurants]);

    useEffect(() => {
        //Sets restaurant list --- depends on restaurant data --- will be updated if address changes
        if (!isEmpty(restaurantData) && !isEmpty(restaurantData.restaurants)) {
            setRestaurantList(restaurantData.restaurants);
        } else {
            setRestaurantList([]);
        }
    }, [restaurantData]);

    if (loading) {
        return <Center h="100vh" ><Loading /></Center>;
    }

    if (error) {
        console.log(error);
        return (
            <Box textAlign="center">
                <Heading size="lg">{t('serverError')}</Heading>
            </Box>
        );
    }

    //To display loading spinner, empty message or restaurant list..
    const getRestaurantView = () => {
        if (fetchingRestaurants) {
            return <Spinner size="lg" color="pink.500" />;
        }

        if (isEmpty(toDisplay)) {
            return <Heading size="md">{t('thereAreNoRestaurantThatDeliversToThisAddressOrSatisfiesGivenFilters')}</Heading>;
        }

        return toDisplay.map((r, index) =>
            <Flex key={index} justifyContent="center" mb={5}>
                <RestaurantListItem
                    details={r}
                />
            </Flex>
        )
    };

    const onSortClick = (value) => {
        if (value !== sortBy) {
            return setSortBy(value);
        }

        return setSortBy('');
    };

    return (
        <Box textAlign="center">
            <AddressModal
                isOpen={isModalOpen}
                addresses={data.myAddresses || []}
                onClose={() => setModalOpen(false)}
                setSelectedAddress={setSelectedAddress}
                selectedId={selectedAddress.id}
            />
            <Address
                icon={`/${selectedAddress.title}.png`}
                details={selectedAddress}
                cursor="pointer"
                actionIcon={<ChevronDownIcon />}
                actionIconOnClick={() => {
                    setModalOpen(true)

                }}
                onClick={() => {
                    setModalOpen(true)
                }}
            />

            <RestaurantFilter
                defaultFilters={defaultFilters}
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                setFilters={setFilters}
            />
            <Box mt={10}>
                <Flex justifyContent="center" mb={5}>
                    <HStack justifyContent="center" spacing={10}>
                        <Button
                            leftIcon={<Icon as={() => {
                                if (isFiltered) {
                                    return <Image src="/close.svg" boxSize="15px" />
                                }

                                return <Image src="/filter.svg" boxSize="15px" />
                            }} />}
                            colorScheme="teal"
                            variant="ghost"
                            onClick={() => {
                                if (!isFiltered) return setFilterModalOpen(true);

                                clearFilters();
                            }}
                        >
                            {!isFiltered ? t('filter') : t('removeFilters')}
                        </Button>
                        <Menu closeOnSelect={false}>
                            <MenuButton
                                disabled={isEmpty(toDisplay)}
                                as={Button}
                                leftIcon={<Icon as={() => <Image src="/sort.svg" boxSize="15px" />} />}
                                colorScheme="teal"
                                variant="ghost"
                            >
                                {t('sort')}
                            </MenuButton>
                            <MenuList>
                                <MenuOptionGroup
                                    value={sortBy}
                                    type="radio"
                                    title={t('sort')}
                                >
                                    <MenuItemOption
                                        value="name-asc"
                                        onClick={() => onSortClick('name-asc')}
                                    >
                                        {t('alphabetical')}
                                    </MenuItemOption>
                                    <MenuItemOption
                                        value="deliveryDetails.minAmount-asc"
                                        onClick={() => onSortClick('deliveryDetails.minAmount-asc')}
                                    >
                                        {t('minAmount')} - {t('ascending')}
                                    </MenuItemOption>
                                    <MenuItemOption
                                        value="deliveryDetails.minAmount-desc"
                                        onClick={() => onSortClick('deliveryDetails.minAmount-desc')}
                                    >
                                        {t('minAmount')} - {t('descending')}
                                    </MenuItemOption>
                                    <MenuItemOption
                                        value="deliveryDetails.estimatedDeliveryTime-asc"
                                        onClick={() => onSortClick('deliveryDetails.estimatedDeliveryTime-asc')}
                                    >
                                        {t('maxArrival')} - {t('ascending')}
                                    </MenuItemOption>
                                    <MenuItemOption
                                        value="deliveryDetails.estimatedDeliveryTime-desc"
                                        onClick={() => onSortClick('deliveryDetails.estimatedDeliveryTime-desc')}
                                    >
                                        {t('maxArrival')} - {t('descending')}
                                    </MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>
                {getRestaurantView()}
            </Box>
        </Box >
    );
}

export default Restaurants;
