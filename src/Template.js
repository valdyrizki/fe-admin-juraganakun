import React, { Suspense } from 'react';
import Footer from './Component/Footer';
import AppHeader from './Component/Navbar';
import AppMenu from './Component/Sidebar';
import Spinner from './views/loading';

function Template({children}) {
    return (
        <div className="wrapper">
           <AppHeader/>
           <AppMenu/>
           
           
            <Suspense fallback={<div className='row justify-content-center align-items-center vh-100'><Spinner/></div>}>
                {children}
            </Suspense>


           <Footer/> 
        </div>
    );
}

export default Template;