/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Suspense, useEffect } from 'react'
import {
  useRoutes
} from 'react-router-dom'
import { useLocalStorageState } from 'ahooks'
import Layout from './layout';
import defaultConfig from '../config.json'
//@ts-expect-error
import routes from '@@react-pages'
import './App.css'

function App() {
  const [config, setConfig ] = useLocalStorageState('config')
  useEffect(() => {
    if (!config) {
      setConfig(defaultConfig)
    }
  }, [])
  // const [count, setCount] = useState(0)
  // const navigate = useNavigate()
  // console.log('routes', routes)
  // console.log('config', config)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>{useRoutes(routes)}</Layout>
    </Suspense>
  )
}

export default App
