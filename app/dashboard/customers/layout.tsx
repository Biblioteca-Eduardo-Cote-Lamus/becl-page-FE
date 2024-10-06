import React from 'react';

interface CustomersLayoutProps {
    children: React.ReactNode;
}

const CustomersLayout: React.FC<CustomersLayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <h1>Customers Dashboard</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>© 2023 Company Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CustomersLayout;