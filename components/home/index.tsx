import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '../../lib/api/api'
import Button from '../public/Button'
import Section from '../public/Section'
import Symbol from '../public/Symbol'

export default function Home() {
  const router = useRouter()

  const [userSymbols, setUserSymbols] = useState([])

  useEffect(() => {
    fetchUserSymbols()
  }, [])

  const fetchUserSymbols = async () => {
    const { data } = await api.get('/user-symbols')
    setUserSymbols(data)
  }

  return (
    <Section title="프로그램">
      {userSymbols.map((userSymbol: any, index) => (
        <Button
          key={String(index)}
          onClick={() => {
            router.push(`/symbols/${userSymbol._id}`)
          }}
        >
          <Symbol {...userSymbol.symbol} />
        </Button>
      ))}
    </Section>
  )
}
