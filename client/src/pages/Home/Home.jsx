import React from 'react';

function Home(props) {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span className="text-bg-dark py-5 w-100 text-center mx-4">
                <h1 className="">
                    Welcome to <span className="text-warning">BeeDiary</span>
                </h1>
                <h3>
                    Here you can make your work in the apiary easier with a handy tool
                </h3>
            </span>
        </div>
    );
}

export default Home;