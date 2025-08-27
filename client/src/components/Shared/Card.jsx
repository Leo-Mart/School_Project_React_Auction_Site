function Card({ children }) {
  return (
    <div className="card card-compact bg-secondary text-black shadow-xl max-h-auto h-full">
      {children}
    </div>
  );
}

export default Card;
