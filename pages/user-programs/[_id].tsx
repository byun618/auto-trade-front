import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgramDetail from '../../components/UserProgram/UserProgramDetail'
import api from '../../lib/api'

export async function getServerSideProps(context: { query: any }) {
  const {
    query: { _id },
  } = context

  const { data: userProgram } = await api.get(`/user-programs/${_id}`)

  return {
    props: { userProgram },
  }
}

const UserProgramDetailPage: NextPage = ({ userProgram }: any) => {
  const router = useRouter()

  return (
    userProgram && (
      <Page router={router} headerTitle="내 프로그램" headerLeft="back">
        <UserProgramDetail userProgram={userProgram} />
      </Page>
    )
  )
}

export default UserProgramDetailPage
