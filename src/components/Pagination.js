import React, { useState, useMemo } from 'react';

const Pagination = ({ maxLimit, callbackOnChangePage }) => {
  const pages = useMemo(() => [...new Array(maxLimit)].map((v, i) => i + 1), [maxLimit]);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleChangePage = (page) => {
    setSelectedPage(page);
    callbackOnChangePage(page);
  };

  return (
    <div className="wrapPagination">
      {pages.map(page => (
        <div
          key={page}
          className={`itemPage ${selectedPage === page ? 'selectedItemPage' : ''}`}
          onClick={() => handleChangePage(page)}>
          {page}
        </div>
      ))}
    </div>
  );
};

export default Pagination;