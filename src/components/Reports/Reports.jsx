import { PopularItems } from "./PopularItems.jsx";

export const Reports = () => {
  return (
    <article>
      <form>
        <div>
          <select>
            <option>Month</option>
          </select>
          <section>
            <div>Total Orders:</div>
          </section>
          <section>
            <div>Total Sales:</div>
          </section>
          <section>
            <div>AVG Order Value:</div>
          </section>
        </div>
      </form>
      <form>
        <section>Day-by-day breakdown of Sales</section>
      </form>
      <div className="popular-items">
        <h2 className="report-header">Popular Items</h2>
        <PopularItems popularData={{}} />
      </div>
    </article>
  );
};
