import styled from '@emotion/styled'
import { ChangeEvent, useEffect, useState } from 'react'
import api from '../../lib/api'
import TickerItem, { TickerItem as TickerItemType } from './TickerItem'
import SearchInput from './SearchInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TickerItemList = styled.div`
  margin-top: 30px;
  flex-grow: 1;
  height: 100%;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const Ticker = () => {
  const [search, setSearch] = useState<string>('')
  const [tickerItem, setTickerItem] = useState<TickerItemType[]>([])

  useEffect(() => {
    fetchTickerItem()
  }, [])

  const fetchTickerItem = async () => {
    const { data } = await api.get('/tickers/verbose')
    setTickerItem(data)
  }

  const fetchSearchTickerItem = async () => {
    const { data } = await api.get(`/tickers/search/${search}`)

    if (data) {
      setTickerItem([data])
    }
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = () => {
    if (search === '') {
      fetchTickerItem()
    } else {
      fetchSearchTickerItem()
    }
  }

  return (
    <Wrapper>
      {/* TODO: 검색창 고정 팔요 */}
      <SearchInput
        type="text"
        name="search"
        value={search}
        placeholder="코인명/티커"
        onChange={onChangeSearch}
        onClickSearch={onClickSearch}
      />
      <TickerItemList>
        {tickerItem.map((tickerItem, index) => (
          <TickerItem key={index} tickerItem={tickerItem} />
        ))}
      </TickerItemList>
    </Wrapper>
  )
}

export default Ticker
