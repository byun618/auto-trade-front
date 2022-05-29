import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import SymbolDetail from '../../components/symbol-detail'
import api from '../../lib/api/api'

const SymbolPage: NextPage = () => {
  const router = useRouter()
  const { _id } = router.query

  const [userSymbol, setUserSymbol] = useState<any>(null)

  useEffect(() => {
    fetchUserSymbol()
  }, [])

  const fetchUserSymbol = async () => {
    const { data } = await api.get(`/user-symbols/${_id}`)

    setUserSymbol(data)
  }

  return (
    <Page
      header={{
        router,
        title: '프로그램',
        left: 'back',
      }}
      full
    >
      {userSymbol ? <SymbolDetail userSymbol={userSymbol} /> : <></>}
    </Page>
  )
}

export default SymbolPage
