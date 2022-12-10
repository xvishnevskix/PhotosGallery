import React, {useEffect} from 'react';
import './index.scss';
import Collection from "./components/Collections";
import axios from "axios";



function App() {

    const [collections, setCollections] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')
    const [categoryId, setCategoryId] = React.useState(0)
    const [page, setPage] = React.useState(1)

    const cats = [
            { "name": "Все" },
            { "name": "Море" },
            { "name": "Горы" },
            { "name": "Архитектура" },
            { "name": "Города" }
        ]

    useEffect( () => {
            fetchPhotos()
    }, [categoryId, page])

    async function fetchPhotos() {
        const category = categoryId ? `category=${categoryId}` : ''
        const pagePara = page ? `page=${categoryId}` : ''
        const response = await axios.get(`https://6311b8dd19eb631f9d779584.mockapi.io/photos?${category}&page=${page}&limit=3`)

        setCollections(response.data)
    }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {cats.map((obj, index) => (
                <li onClick={() => setCategoryId(index)}
                    key={index}
                    className={categoryId === index ? "active" : ""} >{obj.name}</li>
            ))}
        </ul>
        <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
            placeholder="Поиск по названию" />

      </div>
      <div className="content">
          {collections.filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase())
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
          {
              [... Array(3)].map((_, i) => (

                  <li onClick={() => setPage(i+1)}
                      key={i}
                      className={page === i + 1 ? 'active' : ''}>{i+ 1}</li>
              ))
          }
      </ul>
    </div>
  );
}

export default App;
