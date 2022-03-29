import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import AddTickerConfirm from '../components/AddTicker/AddTickerConfirm'
import Ticker from '../components/AddTicker/Ticker'
import TickerBottomSheet from '../components/AddTicker/TickerBottomSheet'
import GeneralButton from '../components/public/GeneralButton'
import Page from '../components/public/Page'
import { useGlobal } from '../contexts/global'
import api from '../lib/api'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 0 20px;
`

const TickerList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 25px;
  grid-gap: 10px;
`

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 10px 18px;
`

const AddTicker: NextPage = () => {
  const { tickers } = useGlobal()
  const [select, setSelect] = useState<string | null>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [start, setStart] = useState<string>('9')
  const [elapse, setElapse] = useState<string>('24')

  const onSelectTicker = (name: string) => {
    setSelect(name)
  }

  const onBottomSheetOpen = () => {
    setIsBottomSheetOpen(true)
  }

  const onBottomSheetClose = () => {
    setIsBottomSheetOpen(false)
    setIsModalOpen(true)
  }

  const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value)
  }

  const onChangeElapse = (e: ChangeEvent<HTMLInputElement>) => {
    setElapse(e.target.value)
  }

  const onSubmitTicker = async () => {
    setIsModalOpen(false)

    await api.post('/user-tickers', {
      name: select,
      start: Number(start),
      elapse: Number(elapse),
    })

    router.push('/')
  }

  const router = useRouter()
  return (
    <Page router={router} headerLeft="back" headerTitle="티커 추가" full>
      <Wrapper>
        <Title>티커</Title>
        {tickers && (
          <TickerList>
            {tickers.map((ticker, index) => (
              <>
                <div key={index}>
                  <Ticker
                    name={ticker}
                    onSelectTicker={onSelectTicker}
                    disabled={select ? select !== ticker : false}
                  />
                </div>
              </>
            ))}
          </TickerList>
        )}
        {select && (
          <>
            <ButtonContainer>
              <GeneralButton onClick={onBottomSheetOpen}>
                티커 선택
              </GeneralButton>
            </ButtonContainer>
            <TickerBottomSheet
              ticker={select}
              isOpen={isBottomSheetOpen}
              start={start}
              elapse={elapse}
              onClose={onBottomSheetClose}
              onChangeStart={onChangeStart}
              onChangeElapse={onChangeElapse}
            />
            <AddTickerConfirm
              isOpen={isModalOpen}
              buttons={[
                {
                  text: '취소',
                  onClick: () => {
                    setIsModalOpen(false)
                  },
                },
                {
                  text: '확인',
                  onClick: onSubmitTicker,
                },
              ]}
              ticker={{
                name: select,
                start: Number(start),
                elapse: Number(elapse),
              }}
            />
          </>
        )}
      </Wrapper>
    </Page>
  )
}

export default AddTicker
