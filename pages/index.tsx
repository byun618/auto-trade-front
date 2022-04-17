import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import Page from '../components/public/Page'
import Search from '../components/Ticker/Search'
import TickerList from '../components/Ticker/TickerList'
import { get } from '../lib/fetcher'
import { Ticker as TickerType } from '../lib/types'

interface HomePageProps {
  tickers: TickerType[]
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const { data: tickers } = await get<TickerType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/tickers/verbose`,
  )

  return {
    props: { tickers },
  }
}

const Home: FunctionComponent<HomePageProps> = ({
  tickers: originalTickers,
}) => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [tickers, setTickers] = useState<TickerType[]>(originalTickers)

  useEffect(() => {
    setTickers(originalTickers)
  }, [originalTickers])

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const _search = event.target.value
    setSearch(event.target.value)

    const tickers = originalTickers.filter((ticker) => {
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
    <Page router={router} headerTitle="홈">
      <Search
        type="text"
        name="search"
        value={search}
        placeholder="코인명/티커"
        onChange={onChangeSearch}
      />
      <TickerList tickers={tickers} />
    </Page>
  )
}

export default Home
