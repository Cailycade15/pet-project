import { useEffect, useState } from 'react'
import type { type_Get_Product } from './types/type_Get_Product';
import Card_grid from './components/cards_grid/Cards_grid';
import './App.css'

function App() {

  const [products, setProducts] = useState<type_Get_Product[]>([])
  const [categorys, setCategorys] =  useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then((data: type_Get_Product[]) => {
      setProducts(data);
      setCategorys([...new Set(data.map(item => item.category))])
    })
    .catch(error => {
        console.error("Error:", error);
    });

    
  }, [])

  return (
    <>
      <Card_grid products={products} categorys={categorys}/>
    </>
  )
}

export default App
