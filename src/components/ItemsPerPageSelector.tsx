"use client";

import React from 'react';

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="itemsPerPage" className="text-sm">Items per page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="border border-gray-300 rounded-md p-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelector; 