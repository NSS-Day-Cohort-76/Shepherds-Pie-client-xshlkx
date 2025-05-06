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
    </article>
  );
};
