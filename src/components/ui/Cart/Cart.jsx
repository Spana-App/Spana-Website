"use client"

import { useEffect, useRef, useState } from "react"
import "./Cart.css"

const Cart = ({ onCartClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cartRef = useRef(null)
  const headerRef = useRef(null)
  const itemsRef = useRef(null)
  const summaryRef = useRef(null)

  // Sample cart items (no real photos)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Website Package",
      description: "Custom website with responsive design",
      price: 1299.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "SEO Optimization",
      description: "3-month search engine optimization package",
      price: 799.5,
      quantity: 1,
    },
    {
      id: 3,
      name: "Mobile App Development",
      description: "Custom iOS & Android application",
      price: 2499.0,
      quantity: 1,
    },
  ])

  useEffect(() => {
    // Animation for cart entrance
    setIsVisible(true)

    // Animate elements
    const elements = [headerRef.current, itemsRef.current, summaryRef.current]
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("animate-in")
        }, 100 * index)
      }
    })

    // Animate bubbles
    const bubbles = document.querySelectorAll(".cart-bubble")
    bubbles.forEach((bubble) => {
      setInterval(() => {
        const xPos = Math.random() * 20 - 10
        const yPos = Math.random() * 20 - 10
        bubble.style.transform = `translate(${xPos}px, ${yPos}px)`
      }, 3000)
    })

    // Close cart on escape key
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onCartClose()
    }, 300) 
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + tax

  return (
    <div className={`cart-overlay ${isVisible ? "visible" : ""}`} onClick={handleClose}>
      <div className={`cart-container ${isVisible ? "visible" : ""}`} ref={cartRef} onClick={(e) => e.stopPropagation()}>
        {/* Decorative bubbles */}
        <div className="cart-bubbles-container">
          <div className="cart-bubble bubble-1"></div>
          <div className="cart-bubble bubble-2"></div>
          <div className="cart-bubble bubble-3"></div>
        </div>

        <div className="cart-header" ref={headerRef}>
          <h2>Your Cart</h2>
          <button className="close-button" onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length > 0 ? (
            <>
              <div className="cart-items" ref={itemsRef}>
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-image">
                      <div className="item-image-placeholder">
                        <span>SP</span>
                      </div>
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-control">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary" ref={summaryRef}>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="promo-code">
                  <input type="text" placeholder="Promo code" />
                  <button>Apply</button>
                </div>

                <button className="checkout-button">
                  <span>Proceed to Checkout</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <button className="continue-shopping" onClick={handleClose}>
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart" ref={itemsRef}>
              <div className="empty-cart-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any services to your cart yet.</p>
              <button className="continue-shopping" onClick={handleClose}>
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
