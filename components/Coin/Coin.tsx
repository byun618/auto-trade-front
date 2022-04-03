import styled from '@emotion/styled'
import { ChangeEvent, useEffect, useState } from 'react'
import api from '../../lib/api'
import CoinItem, { CoinItem as CoinItemType } from './CoinItem'
import SearchInput from './SearchInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CoinItemList = styled.div`
  margin-top: 30px;
  flex-grow: 1;
  height: 100%;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const Coin = () => {
  const [search, setSearch] = useState<string>('')
  const [coinItem, setCoinItem] = useState<CoinItemType[]>([])

  useEffect(() => {
    fetchCoinItem()
  }, [])

  const fetchCoinItem = async () => {
    const { data } = await api.get('/tickers/verbose')
    setCoinItem(data)
  }

  const fetchSearchCoinItem = async () => {
    const { data } = await api.get(`/tickers/search/${search}`)

    setCoinItem([data])
  }

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = () => {
    if (search === '') {
      fetchCoinItem()
    } else {
      fetchSearchCoinItem()
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
      <CoinItemList>
        {coinItem.map((coinItem, index) => (
          <CoinItem key={index} coinItem={coinItem} />
        ))}
      </CoinItemList>
    </Wrapper>
  )
}

export default Coin
