import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { ArrowUpRight, Search } from 'lucide-react';
import image1 from '../Components/image.png'; 
import image2 from '../Components/image2.jpeg'; 
import image3 from '../Components/image3.jpeg'; 
import image4 from '../Components/image4.jpeg'; 

import './home.css';

const Home = () => {
  // 1. Data for Search
  const foodItems = [
    { id: 1, name: 'Pizza Margherita', category: 'Food', price: '$12', img: image1 },
    { id: 2, name: 'Burger Deluxe', category: 'Food', price: '$10', img: image1 },
    { id: 3, name: 'Pasta Alfredo', category: 'Food', price: '$14', img: image1 },
    { id: 4, name: 'Sushi Roll', category: 'Food', price: '$18', img: image1 },
  ];
const foodProducts = [
    { id: 1, name: 'Nike AirForce', img: image2, price: '$120' }, 
    { id: 2, name: 'Google Pixel', img: image3, price: '$899' },
    { id: 3, name: 'Redmi Note 13', img: image4, price: '$400' },
  ];
  // 2. States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Tracks clicked item
  const [showDropdown, setShowDropdown] = useState(false);

  // 3. Filter Logic
  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const carouselImages = [
    { id: 1, img: image1, alt: "Product 1" },
    { id: 2, img: image1, alt: "Product 2" },
  ];

  // If a product is clicked, show the "Product Page"
  if (selectedProduct) {
    return (
      <div className="container mt-5 text-center">
        <button className="btn btn-outline-dark mb-4" onClick={() => setSelectedProduct(null)}>
          ← Back to Home
        </button>
        <div className="card shadow p-5 border-0 rounded-4">
          <img src={selectedProduct.img} alt={selectedProduct.name} style={{ height: '300px', objectFit: 'contain' }} />
          <h1 className="mt-4">{selectedProduct.name}</h1>
          <p className="text-muted fs-4">{selectedProduct.price}</p>
          <button className="btn btn-dark rounded-pill px-5 py-2">Add to Cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-page-container">
      {/* 1. Header Navbar */}
      <header className="header-nav shadow-sm">
        <div className="container d-flex align-items-center justify-content-between py-3">
          <h1 className="logo-text mb-0" onClick={() => setSelectedProduct(null)} style={{ cursor: 'pointer' }}>
            airbite
          </h1>

          {/* Search Logic */}
          <div className="search-container position-relative">
            <input 
              type="text" 
              placeholder="Search food items..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            
            {/* Search Dropdown */}
            {showDropdown && searchTerm && (
              <div className="search-dropdown shadow rounded-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="dropdown-item-custom"
                      onClick={() => {
                        setSelectedProduct(item);
                        setSearchTerm('');
                        setShowDropdown(false);
                      }}
                    >
                      <img src={item.img} alt="" />
                      <span>{item.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-muted">No items found</div>
                )}
              </div>
            )}
          </div>

          <button className="login-btn">
            Login <ArrowUpRight size={20} className="ms-2" />
          </button>
        </div>
      </header>

      {/* 2. Category Pill */}
      <div className="container d-flex justify-content-center my-4">
        <div className="category-pill">
          <span className="category-item active">Stationary</span>
          <span className="category-item">Food Products</span>
        </div>
      </div>

      {/* 3. Automatic Carousel */}
      <div className="container">
        <div className="carousel-outer-wrapper shadow-lg">
          <Carousel fade indicators={true} controls={true} interval={2500} pause={false}>
            {carouselImages.map((slide) => (
              <Carousel.Item key={slide.id}>
                <div className="image-slide-container">
                  <img className="d-block w-100 carousel-main-img" src={slide.img} alt={slide.alt} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
    </div>

<div className="container mt-5 pb-5">
        <h2 className="section-title mb-4">Food Products</h2>
        
        <div className="row g-4">
          {foodProducts.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product.id}>
              <div 
                className="product-card-wrapper"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="product-grid-img" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default Home;