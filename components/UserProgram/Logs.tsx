import styled from '@emotion/styled'

interface LogsProps {
  logs: any[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 15px;
  padding: 15px;

  background: rgba(54, 110, 136, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

const LogWrapper = styled.div``

const ItemsWrapper = styled.div`
  & > :not(:last-of-type) {
    margin-bottom: 10px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
`

const ItemText = styled.div`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #333333;

  padding: 5px 10px;

  background: #f2f2f2;
  border-radius: 15px;
`

const ItemTime = styled.div`
  padding-left: 1px;
  align-self: flex-end;

  font-weight: 500;
  font-size: 8px;
  line-height: 10px;

  color: #808080;
`

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const Date = styled.div`
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  color: #f2f2f2;

  padding: 4px 8px;

  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`

function Logs({ logs }: LogsProps) {
  return (
    <Wrapper>
      {logs.map((log, index) => (
        <LogWrapper key={index}>
          <ItemsWrapper>
            {log.items.map((item: any, idx: number) => (
              <ItemWrapper key={`${index}-${idx}`}>
                <ItemText>{item.message}</ItemText>
                <ItemTime>{item.createdAt.format('HH:mm')}</ItemTime>
              </ItemWrapper>
            ))}
          </ItemsWrapper>
          <DateWrapper>
            <Date>{log.date.format('YYYY년 M월 D일 dddd')}</Date>
          </DateWrapper>
        </LogWrapper>
      ))}
    </Wrapper>
  )
}

export default Logs
