import React from 'react';
import { FiPlus } from 'react-icons/fi'
import { FaPlay } from 'react-icons/fa'
import './style.css'

export default function FeatureMovie(props) {

  const firstDate = new Date(props.item.first_air_date)
  let genres = []

  for (let i in props.item.genres) {
    genres.push(props.item.genres[i].name)
  }

  return (
    <section className="Feature" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})`
    }}>

      <div className="featured-vertical">
        <div className="featured-horizontal">

          <div className="FeatureMovie">
            <div className="movie--name">{props.item.name}</div>
            <div className="movie--info">
              <div className="info--assessment">
                {props.item.vote_average} pontos
              </div>
              <div className="info--year">
                {firstDate.getFullYear()}
              </div>
              <div className="info--number-of-seasons">
                {`${props.item.number_of_seasons} Temporada`}{props.item.number_of_seasons !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="movie--description">
              {props.item.overview}
            </div>
            <div className="movie--buttons">
              <div className="button-play">
                <a href="/#"><FaPlay /> Assistir</a>
              </div>
              <div className="button-view-more">

                <a href="/#"><FiPlus /> Ver mais</a>
              </div>
            </div>
            <div className="movie--genres">
              <p><strong>Gêneros: </strong>{genres.join(', ')}...</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}