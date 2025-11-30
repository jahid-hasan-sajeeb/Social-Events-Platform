import React from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import Title from '../hooks/Title';
import Gallery from '../components/Gallery';
import Features from '../components/Features';

const Home = () => {
    Title("Home | OneSociety")
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Gallery></Gallery>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;