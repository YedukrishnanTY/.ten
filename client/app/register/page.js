import React from 'react'
import { getCurrencyList } from '@/src/services/currency.services';
import Register from '@/src/views/Register'


function page() {

    const getCurrency = async () => {
        await getCurrencyList().then(data => {
            console.log('Currency List:', data);
        }).catch(error => {
            console.error('Error fetching currency list:', error);
        });
    }

    getCurrency();

    return (
        <Register />
    )
}

export default page