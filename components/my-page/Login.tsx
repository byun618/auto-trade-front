import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useGlobal } from '../../contexts/global'
import api from '../../lib/api/api'
import { set } from '../../lib/helper/cookie'
import Button from '../public/Button'
import Input from '../public/Input'

const Wrapper = styled.div`
  padding-top: 40px;

  & > :first-of-type {
    margin-bottom: 20px;
  }
`

const InputWrapper = styled.div`
  padding: 0 40px;
`

const Label = styled.div`
  margin-bottom: 5px;

  font-weight: 600;
  font-size: 15px;

  color: #ffffff;
`

const LoginInput = styled(Input)`
  background-color: #17191c;

  border: 1px solid #555b67;
  border-radius: 5px;

  font-weight: 600;
  font-size: 12px;
  color: #fff;

  &::placeholder {
    color: #555b67;
  }
`

const LoginButtonContainer = styled.div`
  margin: 30px 0;
  padding: 0 40px;
`

const LoginButton = styled(Button)`
  display: flex;

  justify-content: center;
  align-items: center;

  text-align: center;
  width: 100%;

  padding: 13px;

  background: #e0b024;
  border-radius: 5px;

  font-weight: 700;
  font-size: 15px;

  color: #333333;
`

export default function Login() {
  const router = useRouter()
  // const setToken = useSetToken()
  const { setToken } = useGlobal()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const onClickLogin = async () => {
    try {
      const { data: token } = await api.post<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          email,
          password,
        },
      )

      if (token) {
        setToken(token)
        set('token', token)
      }

      router.replace('/')
    } catch (err: any) {
      if (err.response?.data?.message === 'User not Found') {
        alert('로그인 정보가 잘못되었습니다.')
      }
    }
  }

  return (
    <Wrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <LoginInput
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력하세요."
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>패스워드</Label>
        <LoginInput
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호를 입력하세요."
          onChange={onChangePassword}
        />
      </InputWrapper>
      <LoginButtonContainer>
        <LoginButton onClick={onClickLogin}>로그인</LoginButton>
      </LoginButtonContainer>
    </Wrapper>
  )
}
