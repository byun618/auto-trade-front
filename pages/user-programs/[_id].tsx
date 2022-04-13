import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgramDetail from '../../components/UserProgram/UserProgramDetail'
import { useGlobal } from '../../contexts/global'
import api from '../../lib/api'

const UserProgramDetailPage = () => {
  const router = useRouter()

  const { user } = useGlobal()
  const [userProgram, setUserProgram] = useState<any>(null)

  useEffect(() => {
    if (user) {
      fetchUserProgram()
    }
  }, [user])

  const fetchUserProgram = async () => {
    const { _id } = router.query
    const { data } = await api.get(`/user-programs/${_id}`)
    setUserProgram(data)
  }

  return (
    <Page router={router} headerTitle="내 프로그램" headerLeft="back">
      {userProgram && <UserProgramDetail userProgram={userProgram} />}
    </Page>
  )
}

export default UserProgramDetailPage
