import "./PopularItems.css";

export const PopularItems = ({ popularData }) => {
  return (
    <section className="popular-items">
      <h2 className="report-header">Popular Items</h2>

      {/* Popular Sizes */}
      <div className="popular-section">
        <h3>Popular Sizes</h3>
        <div className="popular-list">
          {popularData.sizes?.map((size) => (
            <div key={size.id} className="popular-item">
              <span>{size.name}</span>
              <span>{size.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cheeses */}
      <div className="popular-section">
        <h3>Popular Cheeses</h3>
        <div className="popular-list">
          {popularData.cheeses?.map((cheese) => (
            <div key={cheese.id} className="popular-item">
              <span>{cheese.name}</span>
              <span>{cheese.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Sauces */}
      <div className="popular-section">
        <h3>Popular Sauces</h3>
        <div className="popular-list">
          {popularData.sauces?.map((sauce) => (
            <div key={sauce.id} className="popular-item">
              <span>{sauce.name}</span>
              <span>{sauce.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Toppings */}
      <div className="popular-section">
        <h3>Popular Toppings</h3>
        <div className="popular-list">
          {popularData.toppings?.map((topping) => (
            <div key={topping.id} className="popular-item">
              <span>{topping.name}</span>
              <span>{topping.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
