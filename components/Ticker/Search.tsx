import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'
import Input from '../public/Input'
import SearchIcon from '../../assets/png/search.png'
import Image from '../public/Image'

interface SearchProps {
  style?: object
  type: string
  name: string
  value: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 15px 8px 20px;

  background-color: #fff;

  border-radius: 20px;
`

const SearchInput = styled(Input)`
  border: none;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #333333;

  padding: 0;

  margin-left: 5px;

  &::placeholder {
    color: 808080;
  }
`

function Search(props: SearchProps) {
  return (
    <Wrapper>
      <Image src={SearchIcon} alt="search" width={15} height={15} />
      <SearchInput {...props} />
    </Wrapper>
  )
}

export default Search
