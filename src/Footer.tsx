import * as React from 'react';



export const Footer = () => {
let date:Date = new Date();

    return (

                <div className="Footer">
                    <p>©{date.getFullYear()} All Rights Reserved, WebDev By The Bay</p>
                </div>

    );
};
