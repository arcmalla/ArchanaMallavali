import React, { useEffect, useState } from "react";
import Products_Web from "./plp_web";
import Products_Mobile from "./plp_mobile"
import { isMobile } from 'react-device-detect';

function Products() {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (
        <div style={{ marginTop: '10%' }}>

            {isMobile ?
                <div>
                    {width <= 768 ? <Products_Mobile /> : <Products_Web />}
                </div> : <Products_Web />
            }

        </div>
    )
}

export default Products