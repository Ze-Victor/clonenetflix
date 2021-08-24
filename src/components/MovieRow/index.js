import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './style.css'

export default function MovieRow({ title, items }) {

  const [scrollX, setScrollX] = useState(-800)

  const handleMoveLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0
    }
    setScrollX(x)
  }
  const handleMoveRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listWidth = items.results.length * 150
    if (window.innerWidth - listWidth < listWidth) {
      x = window.innerWidth - listWidth - 60;
    }
    setScrollX(x)
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleMoveLeft} >
        <FaChevronLeft style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleMoveRight}>
        <FaChevronRight style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150
          }}
        >
          {items.results.length > 0 && items.results.map(
            (item, key) => {
              return (
                <div key={key} className="movieRow--item">
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.name} />
                </div>)
            }
          )}
        </div>
      </div>
    </div >
  )
}