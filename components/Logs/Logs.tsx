import styled from '@emotion/styled'
import moment from 'moment-timezone'

export interface UserTickerLog {
  _id?: string
  message: string
  createdAt: string
}

interface LogsProps {
  userTickerLogs: UserTickerLog[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(54, 110, 136, 0.3);
  border-radius: 20px;
  padding: 10px;
`

export default function Logs({ userTickerLogs }: LogsProps) {
  return (
    <Wrapper>
      {userTickerLogs.map((log, index) => (
        <div key={index}>
          [{moment(log.createdAt).format('MM-DD HH:mm:ss')}] {log.message}
        </div>
      ))}
    </Wrapper>
  )
}
