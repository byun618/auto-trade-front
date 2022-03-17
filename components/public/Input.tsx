import styled from '@emotion/styled'

interface InputProps {
  style?: object
  type: string
  name: string
  value: any
  onChange: any
}

const Wrapper = styled.input`
  position: relative;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #e0e0e0;
  padding: 6px 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  //   width: 100%;

  &:focus {
    outline: none;
    border-bottom: 1px solid #808080;
  }
`

export default function Input({
  style,
  type,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <Wrapper
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={style}
    />
  )
}
