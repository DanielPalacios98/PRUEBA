import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo consultar la API')
        return response.json()
      })
      .then(setProducts)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="page">
      <header>
        <p className="eyebrow">Cliente React · API MVC</p>
        <h1>Catálogo de uniformes</h1>
        <p>Productos obtenidos desde <code>GET /api/products</code>.</p>
      </header>

      {loading && <p className="message">Cargando productos…</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && (
        <section className="grid" aria-label="Productos">
          {products.map((product) => (
            <article className="card" key={product.id}>
              <span className="tag">#{product.id}</span>
              <h2>{product.name}</h2>
              <p>{product.institution || 'Producto del catálogo'}</p>
              <strong>${Number(product.price).toFixed(2)}</strong>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
