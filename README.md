# StockFlow – Inventory Management System

StockFlow is a full-stack inventory management application designed to help organizations manage products, track stock quantities, and identify low-stock items.

## Features

- User Registration and Login
- Organization-based product management
- Add, View, Edit, and Delete products
- Unique SKU validation per organization
- Dashboard with inventory summary
- Low-stock product identification
- Secure API authentication using Token Authentication
- Responsive user interface

## Technologies Used

**Frontend**
- React.js
- Vite
- JavaScript
- Axios
- CSS

**Backend**
- Python
- Django
- Django REST Framework
- SQLite
- Django REST Framework Token Authentication

## Project Structure

```text
StockFlow/
│
├── backend/
│   ├── config/
│   ├── inventory/
│   ├── manage.py│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sindhu-ops24/stockflow-inventory-management.git
cd stockflow-inventory-management```
### 2. Backend Setup

```bash
cd backend
```

Activate your Python virtual environment and install the required backend packages.

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend URL: `http://127.0.0.1:8000/`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173/`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a user |
| POST | `/api/login/` | User login |
| GET | `/api/products/` | List products |
| POST | `/api/products/` | Add a product |
| GET | `/api/products/<id>/` | Retrieve a product |
| PATCH | `/api/products/<id>/` | Update a product |
| DELETE | `/api/products/<id>/` | Delete a product |
| GET | `/api/dashboard/` | Dashboard summary |

## Dashboard Information

The dashboard displays:

- Total number of products
- Total stock quantity
- Number of low-stock products
- Low-stock product details

## Security and Data Management

- Token-based authentication for protected API requests.
- Products are associated with their respective organizations.
- Users can access only their organization's products.
- SKU values are unique within each organization.

## Future Improvements

- Product search and filtering
- Inventory reports
- Export inventory data
- Production deployment

## Author

Sindhuja Adepu
B.Tech – Computer Science and Engineering
