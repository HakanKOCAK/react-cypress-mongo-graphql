import React, { useEffect, useState } from 'react';
import {
    Box,
    Center,
    Heading
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client'
import { myAddresses } from '../graphql/queries';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import Address from '../components/Address';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AddressModal from '../components/Modals/AddressList';
import { isEmpty } from 'lodash';

//Page that user is redirected after authentication
const Home = () => {
    const { t } = useTranslation();
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

    useEffect(() => {
        //Check if an address is saved to local storage before and if so check if user still have the address
        const lastAddress = localStorage.getItem('fooder.last.address');
        if (lastAddress && !isEmpty(data)) {
            setSelectedAddress(data.myAddresses.find((a) => a.id === lastAddress) || {});
        }
    }, [setSelectedAddress, data]);

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
                icon={`${selectedAddress.title}.png`}
                details={selectedAddress}
                actionIcon={<ChevronDownIcon />}
                actionIconOnClick={() => {
                    setModalOpen(true)

                }}
                onClick={() => {
                    setModalOpen(true)
                }}
            />
        </Box>
    );
}

export default Home;
