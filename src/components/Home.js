import React, { useEffect, useState } from 'react';

function Home() {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        console.log("running...at Home");
        fetch("/")
            .then(response => response.json())
            .then(data => {
                console.log("fetched");
                console.log(data);
                setResponse(data);
                if (response) {
                    console.log("Response to be handled...")
                }

            })
            .catch(error => {
                console.error('Error:', error);
                setResponse([]);
            });
    }, []);


    return (
        <div className="container mt-4">
            <h2>Home Page</h2>
            
        </div>
    );
}

export default Home;