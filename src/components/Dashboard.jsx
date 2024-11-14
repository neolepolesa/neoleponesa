// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Slider from 'react-slick'; // Import react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 


// Chart.js imports
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch products from localStorage
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    // Prepare data for the bar chart
    const prepareChartData = () => {
        const chartData = {
            labels: products.map(product => product.name),
            datasets: [
                {
                    label: 'Stock Quantity',
                    data: products.map(product => product.quantity),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
        return chartData;
    };
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };

    return (
        <div className="dashboard-container">
            <header>
                <h1>Wings Cafe Management Dashboard</h1>
            </header>

            <nav>
                <Link to="/productmanagement">Manage Products</Link>
                <Link to="/usermanagement">Manage Users</Link>
            </nav>

            <section>
                <h2>Welcome to the Dashboard</h2>
                <p>Efficiently manage your cafe's products and users.</p>
            </section>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
                <button onClick={() => navigate(-1)}>Go Back</button>
                <button onClick={() => navigate("/")}>Logout</button>
            </div>

            {/* React-Slick Image Carousel */}
            <div className="carousel-container" style={{ marginTop: '30px' }}>
                <Slider {...carouselSettings}>
                    <div>
                        <img src="tt.jpg" alt="Image 1" style={{ width: '50%', height: 'auto' }} />
                    </div>
                    <div>
                        <img src="OIP.jpg" alt="Image 2" style={{ width: '50%', height: 'auto' }} />
                    </div>
                    <div>
                        <img src="tt.jpg" alt="Image 3" style={{ width: '50%', height: 'auto' }} />
                    </div>
                </Slider>
            </div>

            <h3>Current Product Inventory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price ($)</th>
                        <th>Stock Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Render Bar Chart */}
            <div style={{ marginTop: '30px' }}>
                <h3>Product Stock Quantity Distribution</h3>
                <Bar data={prepareChartData()} options={{
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Stock Quantity by Product' }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Quantity'
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
};

export default Dashboard;
