export const Order = ({ name, phone, setPhone, setName, orderType, setOrderType }) => {
  return (
    <article>
      <section>
        {/*================= This is the Input Name option =================*/}
        <section>
          <input
            type="text"
            placeholder="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </section>
        {/*================= This is the Input Phone option =================*/}
        <section>
          <input
            type="text"
            placeholder="phone"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </section>
        {/*================= This is the Delivery option for the checkbox =================*/}
        <section>
          <label htmlFor="Delivery">Delivery</label>
          <input
            type="checkbox"
            id="Delivery"
            checked={orderType === "Delivery"}
            onChange={() => {
              setOrderType("Delivery");
            }}
          />
        </section>
        {/*================= This is the Dine-In option for the checkbox =================*/}
        <section>
          <label htmlFor="Dine-In">Dine-In</label>
          <input
            type="checkbox"
            id="Dine-In"
            checked={orderType === "Dine-In"}
            onChange={() => {
              setOrderType("Dine-In");
            }}
          />
        </section>
        {/* <section>
        <div>Tip: ${order.tipAmount}</div>
      </section> */}
      </section>
    </article>
  );
};
