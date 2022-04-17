import styled from '@emotion/styled'

interface ProgramLogsProps {
  programLogs: any[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
  padding: 15px;

  background: rgba(54, 110, 136, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  & > :not(:last-child) {
    margin-bottom: 15px;
  }
`

const ProgramLogWrapper = styled.div`
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`

const LogWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled(Content)`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #333333;

  padding: 5px 10px;

  background: #f2f2f2;
  border-radius: 15px;
`

const Time = styled(Content)`
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
  margin-top: 15px;
`

const Date = styled(Content)`
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  color: #f2f2f2;

  padding: 4px 8px;

  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
`

function ProgramLogs({ programLogs }: ProgramLogsProps) {
  return (
    <Wrapper>
      {programLogs.map((programLog, index) => (
        <ProgramLogWrapper key={index}>
          {programLog.logs.map((log: any, idx: number) => (
            <LogWrapper key={idx}>
              <Message>{log.message}</Message>
              <Time>{log.time}</Time>
            </LogWrapper>
          ))}
          <DateWrapper>
            <Date>{programLog.date}</Date>
          </DateWrapper>
        </ProgramLogWrapper>
      ))}
    </Wrapper>
  )
}

export default ProgramLogs
