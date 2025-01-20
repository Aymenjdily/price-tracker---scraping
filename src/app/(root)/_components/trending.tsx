const Trending = () => {
  return (
    <section>
      <h2>Trending</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {["Apple Iphone", "Book", "Sneakers"].map((product) => (
          <div key={product}>{product}</div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
