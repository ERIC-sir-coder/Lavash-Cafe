
import { useEffect, useState } from 'react'
import Admin from './Admin'
import { supabase } from './lib/supabase'
import './App.css'
import './LavashBackgrounds.css';

type MenuItem = {
  name: string
  price: number | null
  description?: string
}

type MenuCategory = {
  name: string
  items: MenuItem[]
}

type MenuPhotoAssignment = {
  category_name: string
  item_name: string
  storage_path: string
}

type AppLogoProps = {
  className?: string
  title: string
}

function GoogleMapsLogo({ className = '', title }: AppLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#34A853"
        d="M24 3C14.7 3 7.5 10.2 7.5 19.1c0 11.1 16.5 26 16.5 26s16.5-14.9 16.5-26C40.5 10.2 33.3 3 24 3Z"
      />
      <path
        fill="#4285F4"
        d="M24 3C14.7 3 7.5 10.2 7.5 19.1c0 5.8 4.4 12.6 8.8 18.2l8.9-12.9-8.1-5.8 7-11.8Z"
      />
      <path
        fill="#FBBC04"
        d="m16.9 18.6 8.3-11.8c6.7.5 12.2 5.2 14.3 11.3L24 24.4Z"
      />
      <path
        fill="#EA4335"
        d="M16.9 18.6 24 24.4l-7.7 12.9C11.9 31.7 7.5 24.9 7.5 19.1Z"
      />
      <circle cx="24" cy="19" r="7.1" fill="#fff" />
      <circle cx="24" cy="19" r="4.2" fill="#4285F4" />
    </svg>
  )
}

function GoogleCalendarLogo({ className = '', title }: AppLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="7" width="38" height="36" rx="7" fill="#4285F4" />
      <path
        d="M12 7h24a7 7 0 0 1 7 7v4H5v-4a7 7 0 0 1 7-7Z"
        fill="#1967D2"
      />
      <path d="M5 18h38v4H5Z" fill="#34A853" />
      <path
        d="M5 22h38v14a7 7 0 0 1-7 7H12a7 7 0 0 1-7-7Z"
        fill="#4285F4"
      />
      <path
        d="M5 29h38v7a7 7 0 0 1-7 7H12a7 7 0 0 1-7-7Z"
        fill="#34A853"
      />
      <path
        d="M12 7h24a7 7 0 0 1 7 7v4H5v-4a7 7 0 0 1 7-7Z"
        fill="#EA4335"
      />
      <path
        d="M12 7h12v11H5v-4a7 7 0 0 1 7-7Z"
        fill="#4285F4"
      />
      <rect x="12" y="13" width="24" height="25" rx="3" fill="#fff" />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="#4285F4"
      >
        31
      </text>
      <path
        d="M15 4v7M33 4v7"
        stroke="#1967D2"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TruecallerLogo({ className = '', title }: AppLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="14" fill="#1685F8" />
      <path
        d="M14 10.5c-2.4 0-4.3 1.9-4.3 4.3v1.7c0 11.9 9.9 21.8 21.8 21.8h1.7c2.4 0 4.3-1.9 4.3-4.3v-3.2c0-1.2-.8-2.3-2-2.7l-6.1-2c-1.1-.4-2.3 0-3 .9l-1.8 2.3a18 18 0 0 1-7.4-7.4l2.3-1.8c.9-.7 1.3-1.9.9-3l-2-6.1a2.8 2.8 0 0 0-2.7-2Z"
        fill="#fff"
      />
      <path
        d="M27 10h10v10"
        fill="none"
        stroke="#B9E0FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InstagramLogo({ className = '', title }: AppLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="instagram-gradient"
          x1="0"
          y1="48"
          x2="48"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFB900" />
          <stop offset="35%" stopColor="#FF0069" />
          <stop offset="68%" stopColor="#D300C5" />
          <stop offset="100%" stopColor="#7638FA" />
        </linearGradient>
      </defs>
      <rect
        width="48"
        height="48"
        rx="13"
        fill="url(#instagram-gradient)"
      />
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="9"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      />
      <circle
        cx="24"
        cy="24"
        r="7.2"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      />
      <circle cx="33.5" cy="14.8" r="2.1" fill="#fff" />
    </svg>
  )
}

const mainDishDescription =
  'Choose ugali, chapati, pasta, rice, pilau or 2 pancakes, served with vegetables'

const accompanimentDescription =
  'Served with vegetables and your choice of accompaniment'

const sandwichDescription =
  'Choose chips, salad, masala chips or potato wedges'

const menuCategories: MenuCategory[] = [
  {
    name: 'Breakfast',
    items: [
      {
        name: 'House Breakfast',
        description: 'Tea or coffee, 2 eggs, sausages, potatoes and toast',
        price: null,
      },
      { name: 'French Toast', price: null },
      {
        name: 'Goat Liver',
        description: 'Served with pancakes, chapati or toast',
        price: 550,
      },
      { name: '2 Fried Eggs', description: 'Served with toast', price: 300 },
      { name: 'A Bowl of Oats', price: 220 },
      { name: 'Anjera Somali (X2)', price: 150 },
      { name: 'Pancakes with Honey (X2)', price: 150 },
      {
        name: 'Fluffy Pancakes (X2)',
        description: 'Served with maple syrup',
        price: 250,
      },
      { name: 'Waffle', price: 250 },
    ],
  },
  {
    name: 'Omelettes',
    items: [
      {
        name: 'Plain Omelette',
        description: 'Two eggs served with toast',
        price: 300,
      },
      {
        name: 'Rolex Chapati',
        description: 'Chapati wrapped with two omelettes',
        price: 350,
      },
      { name: 'Spanish Omelette', price: 350 },
    ],
  },
  {
    name: 'Snacks & Quick Bites',
    items: [
      { name: 'Beef Samosas (X2)', price: 150 },
      { name: 'Chicken Samosas (X2)', price: 200 },
      {
        name: 'Potato Wedges',
        description: 'Choose chilli or mild',
        price: 200,
      },
      { name: 'Sausages (X2)', price: 160 },
      { name: 'Mandazi', price: 70 },
      { name: 'Chapati', price: 100 },
      { name: 'Pancakes (X2)', price: 150 },
      { name: 'Chicken Pie', price: 200 },
      { name: 'Meat Pie', price: 150 },
    ],
  },
  {
    name: 'Soups',
    items: [
      { name: 'Cream of Chicken', price: null },
      { name: 'Vegetable Soup', price: null },
      { name: 'Aleso Soup', price: null },
    ],
  },
  {
    name: 'Main Dishes',
    items: [
      {
        name: 'Chicken Biriyani',
        description: mainDishDescription,
        price: null,
      },
      {
        name: 'Beef Biriyani',
        description: mainDishDescription,
        price: null,
      },
      { name: 'Pilau', description: mainDishDescription, price: null },
      {
        name: 'Injera Ethiopia',
        description: mainDishDescription,
        price: null,
      },
      {
        name: 'Rice With Sauce',
        description: mainDishDescription,
        price: null,
      },
      { name: 'Spaghetti', description: mainDishDescription, price: null },
      {
        name: 'Pasta Saldato',
        description: mainDishDescription,
        price: 450,
      },
      {
        name: 'KK Saldato',
        description: mainDishDescription,
        price: 400,
      },
      {
        name: 'Aleso',
        description: `Boiled meat; ${accompanimentDescription.toLowerCase()}`,
        price: 580,
      },
      {
        name: 'Kostato',
        description:
          'Boiled camel meat; served with vegetables and your choice of accompaniment',
        price: null,
      },
      {
        name: 'Arosto',
        description:
          'Fried goat meat; served with vegetables and your choice of accompaniment',
        price: 620,
      },
      {
        name: 'Suqaar',
        description: accompanimentDescription,
        price: 580,
      },
    ],
  },
  {
    name: 'Somali Dishes',
    items: [
      { name: 'Aleso', description: 'Boiled meat', price: 580 },
      { name: 'Arosto', description: 'Fried goat meat', price: 620 },
      { name: 'Daylo', price: 600 },
      { name: 'K.K', price: 350 },
      { name: 'K.K Saldato', price: 400 },
      { name: 'Pasta Saldato', price: 450 },
      { name: 'Pilau Beef', price: 450 },
      { name: 'Suquaar', description: 'Goat or camel', price: 580 },
    ],
  },
  {
    name: 'Swahili Plates',
    items: [
      {
        name: 'Chicken Biryani',
        description: 'Served with ugali, chapati, rice or pilau',
        price: 620,
      },
      {
        name: 'Goat Biryani',
        description: 'Served with ugali, chapati, rice or pilau',
        price: 580,
      },
      {
        name: 'Beef Biryani',
        description: 'Served with ugali, chapati, rice or pilau',
        price: 580,
      },
      {
        name: 'Pilau',
        description:
          'Choose goat or beef; served with ugali, chapati, rice or pilau',
        price: 450,
      },
      {
        name: 'Zanzibari Chicken or Fish',
        description: 'Spicy; served with ugali, chapati, rice or pilau',
        price: 580,
      },
      {
        name: 'Coconut Chicken or Fish',
        description: 'Non-spicy; served with ugali, chapati, rice or pilau',
        price: 580,
      },
    ],
  },
  {
    name: 'Indian Tastes',
    items: [
      { name: 'Fish Curry', description: 'Served with rice or naan', price: 580 },
      {
        name: 'Chicken Curry',
        description: 'Served with rice or naan',
        price: 580,
      },
      {
        name: 'Chicken or Fish in Butter Sauce',
        description: 'Served with rice or naan',
        price: 580,
      },
      { name: 'Beef Curry', description: 'Served with rice or naan', price: 580 },
    ],
  },
  {
    name: 'Burgers',
    items: [
      { name: 'Beef Burger', description: sandwichDescription, price: 550 },
      {
        name: 'Vegetable Burger',
        description: sandwichDescription,
        price: 400,
      },
      { name: 'Chicken Burger', description: sandwichDescription, price: 550 },
      {
        name: 'Extra Cheese',
        description: 'Optional burger add-on',
        price: null,
      },
    ],
  },
  {
    name: 'Sandwiches',
    items: [
      {
        name: 'Chicken Sandwich',
        description: sandwichDescription,
        price: 400,
      },
      {
        name: 'Beef Sandwich',
        description: sandwichDescription,
        price: null,
      },
      {
        name: 'Veggie Sandwich',
        description: sandwichDescription,
        price: 300,
      },
      {
        name: 'Club Sandwich Beef',
        description: sandwichDescription,
        price: null,
      },
      {
        name: 'Club Sandwich Chicken',
        description: sandwichDescription,
        price: 450,
      },
      {
        name: 'Wrap Sandwich Eggs',
        description: sandwichDescription,
        price: null,
      },
      { name: 'Chicken Wrap', description: sandwichDescription, price: 450 },
      {
        name: 'Mexican Sandwich Beef',
        description: sandwichDescription,
        price: null,
      },
      {
        name: 'Mexican Sandwich Chicken',
        description: sandwichDescription,
        price: null,
      },
      {
        name: 'Extra Cheese',
        description: 'Optional sandwich add-on',
        price: null,
      },
    ],
  },
  {
    name: 'Salads',
    items: [
      { name: 'Tuna Salad', price: 400 },
      { name: 'Garden Salad', price: 250 },
      { name: 'Chicken Salad', price: 400 },
      { name: 'Culler Salad', price: null },
      {
        name: 'Fruit Salad',
        description: 'With honey, yoghurt and nuts',
        price: 300,
      },
    ],
  },
  {
    name: "Kids' Corner",
    items: [
      { name: 'Chicken Nuggets with Chips', price: null },
      { name: 'Kiddies Fish Fingers with Chips', price: null },
      { name: 'Chips with Sausage', price: null },
    ],
  },
  {
    name: 'Fries & Sides',
    items: [
      { name: 'Chips', price: null },
      { name: 'Chips Masala', price: null },
      {
        name: 'Potato Wedges',
        description: 'Chilli or mild',
        price: 200,
      },
      { name: 'Wedges & Toast', price: null },
      { name: 'Chapati / Toast', price: null },
    ],
  },
  {
    name: 'Stir-Fry Dishes',
    items: [
      {
        name: 'Chicken Stir-Fry',
        description: 'Served with spaghetti',
        price: 550,
      },
      {
        name: 'Beef Stir-Fry',
        description: 'Served with spaghetti',
        price: 550,
      },
      {
        name: 'Fish Stir-Fry',
        description: 'Served with spaghetti',
        price: 550,
      },
    ],
  },
  {
    name: 'Steaks & Specialties',
    items: [
      {
        name: 'Steak in Pepper Sauce',
        description: 'Served with chips',
        price: 600,
      },
      { name: 'Sweet & Sour Chicken', price: 600 },
    ],
  },
  {
    name: 'Juices',
    items: [
      { name: 'Mango Juice', price: 220 },
      { name: 'Orange Juice', price: 250 },
      { name: 'Passion Juice', price: 220 },
      { name: 'Lemonade', price: 220 },
      { name: 'Mixberry Juice', price: null },
      { name: 'Lemon Mint Juice', price: 250 },
      { name: 'Mint Pineade', price: 250 },
      { name: 'Pineapple Juice', price: 220 },
      { name: 'Cocktail Juice', price: 250 },
    ],
  },
  {
    name: 'Hot Drinks',
    items: [
      { name: 'House Coffee', price: 180 },
      { name: 'Espresso', price: 150 },
      { name: 'Americano', price: 180 },
      { name: 'Macchiato', price: 180 },
      { name: 'Cappuccino', price: 200 },
      { name: 'Mocha', price: 200 },
      { name: 'Café Latte', price: 220 },
      { name: 'Chai Latte', price: 220 },
      { name: 'Camel Coffee (Milk)', price: 200 },
      { name: 'Camel Tea (Milk)', price: 200 },
      { name: 'Latte Macchiato', price: 200 },
      { name: 'Hot Chocolate', price: 200 },
      { name: 'Kenyan Tea', price: 180 },
      { name: 'Lemon Tea', price: 180 },
      {
        name: 'Herbal Infusion Dawa',
        description: 'Hot lemon, honey and ginger',
        price: 220,
      },
      { name: 'Moroccan Minty', price: 220 },
      { name: 'Black Tea', price: 120 },
      { name: 'Fresh Camel Milk', price: null },
    ],
  },
  {
    name: 'Other Drinks',
    items: [
      { name: 'Mineral Water (500 ml)', price: null },
      { name: 'Mineral Water (1 L)', price: null },
      { name: 'Dasani (500 ml)', price: null },
      { name: 'Keringet (500 ml)', price: null },
      { name: 'Sparkling Water (500 ml)', price: null },
      { name: 'Sodas', price: null },
    ],
  },
  {
    name: 'Milkshakes',
    items: [
      { name: 'Chocolate Milkshake', price: null },
      { name: 'Vanilla Milkshake', price: null },
      { name: 'Strawberry Milkshake', price: null },
      { name: 'Banana Milkshake', price: null },
      { name: 'Espresso Milkshake', price: null },
      { name: 'Mocha Milkshake', price: null },
      { name: 'Caramel Milkshake', price: null },
      { name: 'Mango Milkshake', price: null },
    ],
  },
  {
    name: 'Ice Cream',
    items: [
      { name: 'Ice Cream — 1 Scoop', price: 100 },
      { name: 'Ice Cream — 2 Scoops', price: 150 },
    ],
  },
]

const phoneDisplay = '0758 903 974'
const phoneLink = 'tel:+254758903974'
const instagramLink = 'https://www.instagram.com/lavash_cafe_ke/'

const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=Lavash+Cafe+South+B+Shopping+Center+Mchumbi+Road+Nairobi'

const plusCodeLink =
  'https://www.google.com/maps/search/?api=1&query=MRQP%2B9G%20Nairobi'

const photoBucket = 'lavash-photos'
const lavashLogo = '/lavash-logo.png'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [menuPhotos, setMenuPhotos] = useState<Record<string, string>>({})

  const isAdminPage =
    window.location.pathname.replace(/\/+$/, '') === '/admin'

  useEffect(() => {
    if (isAdminPage) return

    let cancelled = false

    async function loadMenuPhotos() {
      const { data, error } = await supabase
        .from('menu_item_photos')
        .select('category_name, item_name, storage_path')

      if (error) {
        console.error('Unable to load menu photos:', error.message)
        return
      }

      if (!data || cancelled) return

      const photoMap: Record<string, string> = {}

      ;(data as MenuPhotoAssignment[]).forEach((assignment) => {
        const { data: publicUrlData } = supabase.storage
          .from(photoBucket)
          .getPublicUrl(assignment.storage_path)

        const key = `${assignment.category_name}::${assignment.item_name}`
        photoMap[key] = publicUrlData.publicUrl
      })

      if (!cancelled) {
        setMenuPhotos(photoMap)
      }
    }

    void loadMenuPhotos()

    return () => {
      cancelled = true
    }
  }, [isAdminPage])

  if (isAdminPage) {
    return <Admin />
  }

  const visibleCategories =
    activeCategory === 'All'
      ? menuCategories
      : menuCategories.filter((category) => category.name === activeCategory)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Lavash Cafe home">
          <img
            className="brand-logo"
            src={lavashLogo}
            alt="Lavash Cafe logo"
            style={{
              height: '54px',
              width: 'auto',
              maxWidth: '180px',
              objectFit: 'contain',
            }}
          />
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#visit">Visit Us</a>
        </nav>

        <a className="header-cta" href="#menu">
          Explore Menu
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO LAVASH CAFE</p>

            <h1>
              Good Food.
              <br />
              <span>Golden Moments.</span>
            </h1>

            <p className="hero-description">
              Enjoy a welcoming cafe experience with breakfast, satisfying
              meals, fresh juices, coffee and more in South B, Nairobi.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#services">
                Discover Our Services
              </a>

              <a className="button button-outline" href="#menu">
                Explore Our Menu
              </a>

              <a className="button button-outline" href="#visit">
                Plan Your Visit
              </a>
            </div>

            <div className="hero-note">
              <span className="gold-line" aria-hidden="true" />
              <p>Good taste. Warm hospitality. Memorable moments.</p>
            </div>
          </div>

          <div className="hero-visual" aria-label="Cafe atmosphere">
            <div className="hero-image-placeholder">
              <img
                className="hero-brand-logo"
                src={lavashLogo}
                alt="Lavash Cafe logo"
                style={{
                  width: '100%',
                  maxWidth: '240px',
                  height: 'auto',
                  maxHeight: '180px',
                  objectFit: 'contain',
                }}
              />
              <p>Lavash Cafe</p>
              <span>Good taste. Golden moments.</span>
            </div>

            <div className="hero-badge">
              <span>MADE FOR</span>
              <strong>GOOD TASTE</strong>
            </div>
          </div>
        </section>

        <section className="welcome-strip" aria-label="Cafe highlights">
          <div>
            <span className="strip-icon" aria-hidden="true">
              ✦
            </span>
            <p>Breakfast & All-Day Favourites</p>
          </div>

          <div>
            <span className="strip-icon" aria-hidden="true">
              ✦
            </span>
            <p>Local & International Flavours</p>
          </div>

          <div>
            <span className="strip-icon" aria-hidden="true">
              ✦
            </span>
            <p>Dine-In, Takeaway & Free Wi-Fi</p>
          </div>
        </section>

        <section className="menu-section section-padding" id="menu">
          <div className="section-heading">
            <p className="eyebrow">A TASTE OF LAVASH</p>
            <h2>Discover Our Menu</h2>
            <p>
              Explore breakfast, Somali and Swahili dishes, Indian favourites,
              burgers, sandwiches, salads, snacks, juices, hot drinks and more.
            </p>
          </div>

          <div
            className="menu-category-filters"
            role="group"
            aria-label="Filter menu by category"
          >
            <button
              type="button"
              className={`menu-filter-button ${
                activeCategory === 'All' ? 'active' : ''
              }`}
              onClick={() => setActiveCategory('All')}
              aria-pressed={activeCategory === 'All'}
            >
              All Menu
            </button>

            {menuCategories.map((category) => (
              <button
                type="button"
                key={category.name}
                className={`menu-filter-button ${
                  activeCategory === category.name ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.name)}
                aria-pressed={activeCategory === category.name}
              >
                {category.name}
              </button>
            ))}
          </div>

          {visibleCategories.map((category) => (
            <div className="menu-category-section" key={category.name}>
              <div className="menu-category-heading">
                <p className="eyebrow">EXPLORE OUR SELECTION</p>
                <h3>{category.name}</h3>
                <span>{category.items.length} items</span>
              </div>

              <div className="featured-grid">
                {category.items.map((item, index) => {
                  const photoKey = `${category.name}::${item.name}`
                  const photoUrl = menuPhotos[photoKey]

                  return (
                    <article
                      className="menu-card"
                      key={`${category.name}-${item.name}-${index}`}
                    >
                      {photoUrl && (
                        <div className="menu-card-image">
                          <img
                            src={photoUrl}
                            alt={`${item.name} from Lavash Cafe`}
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="menu-card-content">
                        <h3>{item.name}</h3>

                        <p>
                          {item.description ||
                            'A Lavash Cafe menu selection.'}
                        </p>

                        <div className="menu-card-footer">
                          <span className="menu-price">
                            {item.price === null
                              ? 'Price to be confirmed'
                              : `KSh ${item.price.toLocaleString('en-KE')}`}
                          </span>

                          <span className="menu-card-detail">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          ))}

          <p className="menu-note">
            Menu prices are subject to confirmation by Lavash Cafe management.
            Please contact the cafe to confirm current prices and availability.
          </p>
        </section>

        <section className="about-section section-padding" id="about">
          <div className="about-visual">
            <div className="about-image-placeholder">
              <img
                className="about-brand-logo"
                src={lavashLogo}
                alt="Lavash Cafe logo"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  maxHeight: '160px',
                  objectFit: 'contain',
                }}
              />
              <p>A Place to Enjoy</p>
              <small>Good food. Warm hospitality.</small>
            </div>
          </div>

          <div className="about-content">
            <p className="eyebrow">ABOUT LAVASH CAFE</p>
            <h2>More Than Just a Meal</h2>

            <p>
              Lavash Cafe offers a varied menu in a welcoming setting. Visit
              for breakfast, a satisfying meal, a refreshing drink or a coffee
              break.
            </p>

            <p>
              The menu brings together African, Somali, Swahili and Indian
              flavours alongside familiar cafe favourites.
            </p>
          </div>
        </section>

        <section className="services-section section-padding" id="services">
          <div className="section-heading">
            <p className="eyebrow">THE LAVASH EXPERIENCE</p>
            <h2>Our Services</h2>

            <p>
              Whether you are joining us for a meal or taking a break, Lavash
              Cafe is here to make your visit enjoyable.
            </p>
          </div>

          <div className="featured-grid">
            <article className="menu-card">
              <div className="menu-card-content">
                <h3>Dine-In</h3>
                <p>
                  Enjoy your favourite meals and drinks in a welcoming cafe
                  atmosphere.
                </p>
              </div>
            </article>

            <article className="menu-card">
              <div className="menu-card-content">
                <h3>Takeaway</h3>
                <p>
                  Take your favourite Lavash Cafe meals with you to enjoy at
                  home or at work.
                </p>
              </div>
            </article>

            <article className="menu-card">
              <div className="menu-card-content">
                <h3>Free Wi-Fi</h3>
                <p>
                  Stay connected while enjoying your time at the cafe.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="visit-section section-padding" id="visit">
          <div className="section-heading">
            <p className="eyebrow">WE LOOK FORWARD TO WELCOMING YOU</p>
            <h2>Visit Lavash Cafe</h2>
            <p>
              Find us at South B Shopping Center along Mchumbi Road, Nairobi.
            </p>
          </div>

          <div className="visit-card">
            <div className="visit-detail">
              <GoogleMapsLogo
                className="app-logo-icon google-maps-logo"
                title="Google Maps"
              />

              <div>
                <h3>Our Location</h3>
                <p>South B Shopping Center, Mchumbi Road, Nairobi, Kenya</p>
                <p>Plus Code: MRQP+9G Nairobi</p>

                <a
                  className="text-link"
                  href={plusCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Location →
                </a>
              </div>
            </div>

            <div className="visit-detail">
              <GoogleCalendarLogo
                className="app-logo-icon google-calendar-logo"
                title="Google Calendar"
              />

              <div>
                <h3>Opening Hours</h3>
                <p>Monday – Sunday: 7:00 AM – 9:00 PM</p>
                <p>Open daily</p>
              </div>
            </div>

            <div className="visit-detail">
              <TruecallerLogo
                className="app-logo-icon truecaller-logo"
                title="Phone"
              />

              <div>
                <h3>Call Us</h3>
                <p>{phoneDisplay}</p>

                <a className="text-link" href={phoneLink}>
                  Call Lavash Cafe →
                </a>
              </div>
            </div>

            <div className="visit-detail">
              <InstagramLogo
                className="app-logo-icon instagram-logo"
                title="Instagram"
              />

              <div>
                <h3>Follow Us on Instagram</h3>
                <p>@lavash_cafe_ke</p>

                <a
                  className="text-link"
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Our Instagram →
                </a>
              </div>
            </div>

            <a
              className="button button-primary directions-button"
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a
          className="brand footer-brand"
          href="#home"
          aria-label="Lavash Cafe home"
        >
          <img
            className="footer-brand-logo"
            src={lavashLogo}
            alt="Lavash Cafe logo"
            style={{
              height: '44px',
              width: 'auto',
              maxWidth: '160px',
              objectFit: 'contain',
            }}
          />
        </a>

        <p>A taste to remember.</p>

        <div className="footer-social-links">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Lavash Cafe on Instagram"
          >
            <InstagramLogo
              className="footer-app-logo instagram-logo"
              title="Instagram"
            />
            <span>Instagram</span>
          </a>

          <span aria-hidden="true">•</span>

          <a href={phoneLink}>Call Us</a>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} Lavash Cafe. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default App
