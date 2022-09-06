import React, { useRef } from 'react';
import { gql, useQuery } from '@apollo/client';
import useNavigation from './../../hooks/useNavigation';
import Error from './../Error';
import Loader from './../Loader';
import TopMenu from './../TopMenu';
import SideMenu from './../SideMenu';
import './style.scss';
const GET_ROCKETS_NAMES = gql`
    {
        rockets(offset: 1) {
            name
            id
        }
    }
`;

function NavBar() {
    const navigationRef = useRef(null);
    const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation(navigationRef);
    const { data, loading, error } = useQuery(GET_ROCKETS_NAMES);
    if (loading) return <Loader />;
    if (error) return <Error error={error} />;
    return (
        <div className="space-x" ref={navigationRef}>
            <div className="row">
                <TopMenu
                    isMenuOpen={isMenuOpen}
                    isMobileView={isMobileView}
                    toggleMenu={setIsMenuOpen}
                    rockets={data.rockets}
                />
                <SideMenu isMenuOpen={isMenuOpen} isMobileView={isMobileView} toggleMenu={setIsMenuOpen} />
            </div>
        </div>
    );
}

export default NavBar;
