import styled from '@emotion/styled'

const Wrapper = styled.div`
  position: relative;
`

const _Input = styled.input`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #e0e0e0;
  padding: 6px 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }

  &::placeholder {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: black;
  }
`

const Right = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`

// TODO: any 나중에 수정할 것
export default function Input(props: any) {
  return (
    <Wrapper>
      <_Input {...props} ref={props.inputRef} />
      {props.right && <Right>{props.right}</Right>}
    </Wrapper>
  )
}
