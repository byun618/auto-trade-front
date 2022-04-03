import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import SearchInput from '../../components/Ticker/SearchInput'
import Ticker, { Ticker as TickerType } from '../../components/Ticker/Ticker'
import api from '../../lib/api'

const TickerList = styled.div`
  margin-top: 30px;
  flex-grow: 1;
  height: 100%;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const TickerPage = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [tickers, setTickers] = useState<TickerType[]>([])

  useEffect(() => {
    fetchTicker()
  }, [])

  const fetchTicker = async () => {
    const { data } = await api.get('/tickers/verbose')
    setTickers(data)
  }

  const fetchSearchTicker = async () => {
    const { data } = await api.get(`/tickers/search/${search}`)

    if (data) {
      setTickers([data])
    }
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = () => {
    if (search === '') {
      fetchTicker()
    } else {
      fetchSearchTicker()
    }
  }

  return (
    <Page router={router} headerTitle="코인" headerRight={['user']}>
      {/* TODO: 검색창 고정 팔요 */}
      <SearchInput
        type="text"
        name="search"
        value={search}
        placeholder="코인명/티커"
        onChange={onChangeSearch}
        onClickSearch={onClickSearch}
      />
      <TickerList>
        {tickers.map((ticker, index) => (
          <Ticker key={index} ticker={ticker} />
        ))}
      </TickerList>
    </Page>
  )
}

export default TickerPage
