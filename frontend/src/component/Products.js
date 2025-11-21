import "./Main.css";

function Products() {
  const products = [
    { name: "Sample Product", unit: "1 pc", category: "Category", brand: "Brand", stock: 10, status: "Active" },
    { name: "Apple Juice", unit: "1 L", category: "Beverage", brand: "Tropicana", stock: 25, status: "Active" },
    { name: "Tomato Ketchup", unit: "500 g", category: "Food", brand: "Kissan", stock: 15, status: "Active" },
    { name: "Notebook", unit: "200 pages", category: "Stationery", brand: "Classmate", stock: 40, status: "Active" },
    { name: "Shampoo", unit: "180 ml", category: "Personal Care", brand: "Dove", stock: 18, status: "Active" },
    { name: "Handwash", unit: "250 ml", category: "Hygiene", brand: "Lifebuoy", stock: 30, status: "Active" },
    { name: "Chocolate Bar", unit: "50 g", category: "Snacks", brand: "KitKat", stock: 50, status: "Active" },
    { name: "Pen", unit: "1 pc", category: "Stationery", brand: "Reynolds", stock: 100, status: "Active" },
    { name: "Milk Packet", unit: "500 ml", category: "Dairy", brand: "Amul", stock: 20, status: "Active" },
    { name: "Detergent Powder", unit: "1 kg", category: "Home Care", brand: "Surf Excel", stock: 12, status: "Active" }
  ];

  return (
    <div className="main-container">
      <h2 className="main-title">Products Inventory</h2>
      <p className="main-subtext">View, update, and manage all products here.</p>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.unit}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{p.stock}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
