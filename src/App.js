import React, { useEffect, useState } from 'react';
import { getHomeList, getMovieInfo } from './Tmdb.js';
import { FcVideoCall, FcReading, FcHighPriority } from "react-icons/fc";
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import './App.css'

const App = () => {

  const [movielist, setMovieList] = useState([]);
  const [featureDate, setFeatureDate] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Lista TOTAL
      let list = await getHomeList()
      setMovieList(list)

      //Lista de Feature
      let featureList = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * featureList[0].items.results.length - 1)
      let chosen = featureList[0].items.results[randomChosen]
      let chosenInfo = await getMovieInfo(chosen.id, 'tv')

      console.log(chosenInfo)

      setFeatureDate(chosenInfo)

    }

    loadAll();

  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <div className="header">
        <Header black={blackHeader} />
      </div>
      <div className="featuresMovie">
        {featureDate && <FeatureMovie item={featureDate} />}
      </div>
      <section className="list" >
        {movielist.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />
        })}
      </section>
      <footer>
        <p>Feito em live de Bonieky Lacerda <FcVideoCall /></p>
        <p>Live sobre React <FcReading /></p>
        <p>Direito de imagens a Netflix <FcHighPriority /></p>
      </footer>
      {movielist.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="carregando" />
        </div>
      }
    </div>
  );
}

export default App;
