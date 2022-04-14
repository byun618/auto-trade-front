interface Nav {
  name: string
  title: string
  path: string
}

const nav: Nav[] = [
  {
    name: 'Ticker',
    title: '코인',
    path: '/tickers',
  },
  {
    name: 'UserProgram',
    title: '내 프로그램',
    path: '/user-programs',
  },
]

export default nav
