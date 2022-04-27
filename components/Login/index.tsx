import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import Logo from '../../assets/png/logo-120x120.png'
import useToken from '../../hooks/token'
import { post } from '../../lib/fetcher'
import Button from '../public/Button'
import Image from '../public/Image'
import LoginButton from './LoginButton'
import LoginInput from './LoginInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 18.47vh;
`

const LogoWrapper = styled(Button)`
  display: flex;
  justify-content: center;
`

const LoginInputWrapper = styled.div`
  margin-top: 8.62vh;
  padding: 0 20px;

  & > :last-child {
    margin-top: 20px;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 8.62vh;
  padding: 0 20px;
`

export default function LoginContainer() {
  const router = useRouter()
  const [, setToken] = useToken()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onKeyUp = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      onClickLogin()
    }
  }

  const onClickLogin = async () => {
    try {
      const { data: token } = await post<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          email,
          password,
        },
      )

      setToken(token)
      router.replace('/')
    } catch (err: any) {
      if (err.message === 'User not Found') {
        alert('로그인 정보가 잘못되었습니다.')
      }
    }
  }

  return (
    <Wrapper>
      <LogoWrapper
        onClick={() => {
          console.log('1')
        }}
      >
        <Image src={Logo} alt="logo" width={120} height={120} />
      </LogoWrapper>
      <LoginInputWrapper>
        <LoginInput
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력하세요."
          onChange={onChangeEmail}
        />
        <LoginInput
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력하세요."
          onChange={onChangePassword}
          onKeyUp={onKeyUp}
        />
      </LoginInputWrapper>
      <ButtonWrapper>
        <LoginButton onClick={onClickLogin}>로그인</LoginButton>
      </ButtonWrapper>
    </Wrapper>
  )
}
