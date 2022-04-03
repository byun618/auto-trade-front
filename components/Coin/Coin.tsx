import styled from '@emotion/styled'
import { ChangeEvent, useState } from 'react'
import SearchInput from './SearchInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Coin = () => {
  const [search, setSearch] = useState<string>('')

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = () => {
    alert(search)
  }

  return (
    <Wrapper>
      <SearchInput
        type="text"
        name="search"
        value={search}
        placeholder="코인명 / 티커"
        onChange={onChangeSearch}
        onClickSearch={onClickSearch}
      />
    </Wrapper>
  )
}

export default Coin
