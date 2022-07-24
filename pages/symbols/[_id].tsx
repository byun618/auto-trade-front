import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import SymbolDetail from '../../components/symbol-detail'
import { useGlobal } from '../../contexts/global'
import api from '../../lib/api/api'

const SymbolPage: NextPage = () => {
  const router = useRouter()
  const { userSymbol, setUserSymbol } = useGlobal()

  const { _id } = router.query

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
      {userSymbol ? <SymbolDetail /> : <></>}
    </Page>
  )
}

export default SymbolPage
