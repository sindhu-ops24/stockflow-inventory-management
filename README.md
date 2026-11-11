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
│   ├── migrations/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sindhu-ops24/stockflow-inventory-management.git
cd stockflow-inventory-management
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside the backend folder and configure your Django secret key:

```env
DJANGO_SECRET_KEY=your_secret_key
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash