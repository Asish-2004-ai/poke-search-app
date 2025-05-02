function Pagination({ currentPage, totalPages, setPage }) {
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);
    return (
      <div className="pagination">
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        ))}
      </div>
    );
  }
  export default Pagination;
  