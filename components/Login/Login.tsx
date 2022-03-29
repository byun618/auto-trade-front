import styled from '@emotion/styled'
import axios from 'axios'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Logo from '../../assets/png/logo-120x120.png'
import { useGlobal } from '../../contexts/global'
import GeneralButton from '../public/GeneralButton'
import Image from '../public/Image'
import LoginInput from './LoginInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 18.47vh;
`

const LogoWrapper = styled.div`
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

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { updateToken } = useGlobal()

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onClickLogin = async () => {
    const {
      data: { token },
    } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      email,
      password,
    })

    updateToken(token)
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Image src={Logo} alt="logo" width={120} height={120} />
      </LogoWrapper>
      <LoginInputWrapper>
        <LoginInput
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          onChange={onChangeEmail}
        />
        <LoginInput
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChangePassword}
        />
      </LoginInputWrapper>
      <ButtonWrapper>
        <GeneralButton onClick={onClickLogin}>로그인</GeneralButton>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default Login
