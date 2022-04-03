import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import SearchInput from '../../components/Ticker/SearchInput'
import Ticker, { Ticker as TickerType } from '../../components/Ticker/Ticker'
import { useGlobal } from '../../contexts/global'

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
  const { tickers: globalTickers } = useGlobal()
  const [tickers, setTickers] = useState<TickerType[]>(globalTickers)

  useEffect(() => {
    setTickers(globalTickers)
  }, [globalTickers])

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const _search = event.target.value
    setSearch(event.target.value)

    const tickers = globalTickers.filter((ticker) => {
      const { market, korean_name, english_name } = ticker

      if (
        korean_name.includes(_search) ||
        english_name.toLowerCase().includes(_search.toLowerCase()) ||
        market.split('-')[1].toLowerCase().includes(_search.toLowerCase())
      ) {
        return true
      }
    })

    setTickers(tickers)
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
