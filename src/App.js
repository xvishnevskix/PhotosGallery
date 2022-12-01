import React, {useEffect} from 'react';
import './index.scss';
import Collection from "./components/Collections";
import axios from "axios";



function App() {

    const [collections, setCollections] = React.useState([])

    useEffect( () => {
            fetchPhotos()
    }, [])

    async function fetchPhotos() {
        const response = await axios.get(`https://6311b8dd19eb631f9d779584.mockapi.io/photos`)

        setCollections(response.data)
    }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {collections.filter((obj) => {

          }).
          map((obj, index) => (
              <Collection
                  name={obj.name}
                  images={obj.photos}
                  category={obj.category}
                  key={index}
              />
              )
          )}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
