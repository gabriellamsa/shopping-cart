# Shopping Cart App - React + Vite + Tailwind CSS + Stripe

This is a fully functional e-commerce application built with modern web technologies. The app features a shopping cart system with Stripe payment integration, persistent data storage, and a responsive design.

## Features

- 🛍️ Shopping cart functionality
  - Add/remove items
  - Update quantities
  - Real-time total price calculation
- 💳 Stripe payment integration
  - Secure checkout process
  - Success/cancel payment handling
- 💾 Data persistence
  - Local storage for cart items
  - Context API for state management
- 🎨 Modern UI/UX
  - Responsive design
  - Tailwind CSS styling
  - Lucide icons

## Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **State Management**: React Context API
- **Payment Processing**: Stripe
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Development Tools**:
  - ESLint
  - PostCSS
  - Autoprefixer

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Stripe account (for payment processing)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shopping-cart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shopping-cart
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
src/
├── assets/
│   └── data/         # Product data
├── components/       # Reusable components
├── context/         # React Context providers
├── pages/           # Page components
├── utilities/       # Helper functions
└── App.jsx         # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
