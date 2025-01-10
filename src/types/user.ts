export interface User {
  pseudo: string
  id: number
  email: string
  password: string
  avatar: string
  wallet: {
    balance: {
      USD: number
      BTC: number
      ETH: number
    }
    transaction: Array<{
      id: Date
      type: 'deposit' | 'Withdraw'
      amount: number
      currency: string
      date: string
    }>
  }
}
