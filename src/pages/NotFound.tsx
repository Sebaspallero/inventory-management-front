import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the homepage.</p>
      <p>If you think this is a mistake, please contact support.</p>
      <p>Thank you for your understanding.</p>
      <Link to="/">Go to Homepage</Link>
    </section>
  )
}

export default NotFound