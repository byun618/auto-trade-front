import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Page from '../components/public/Page'
import { sampleState } from '../stores/ global'
import { get as GET } from '../lib/fetcher'

export default function Home() {
  const [sample, setSample] = useRecoilState(sampleState)

  const fetchTest = async () => {
    const test = await GET('/api/test')

    setSample(test.a)
  }

  useEffect(() => {
    fetchTest()
  }, [])

  return (
    <Page>
      <div>{sample}</div>
    </Page>
  )
}
