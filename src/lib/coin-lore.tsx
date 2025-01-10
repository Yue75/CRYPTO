import { ApiCryptos, Cryptos } from '@/types/cryptos'

/**
 * Récupère toutes les cryptos
 * récupère 10 cryptos
 * @returns {Promise<Cryptos>}
 */
export async function getCryptos(): Promise<Array<Cryptos>> {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/tickers/?start=1&limit=25`)
  const data: ApiCryptos = await res.json()
  return data.data
}

/**
 * Récupère les 3 cryptos les plus élévées en argent
 * @returns
 */
export async function getHotCoins(): Promise<Array<Cryptos>> {
  const cryptos = await getCryptos()
  return cryptos.sort((a, b) => parseFloat(b.price_usd) - parseFloat(a.price_usd)).slice(0, 3)
}

export async function getTopGainerCoin(): Promise<Array<Cryptos>> {
  const cryptos = await getCryptos()
  return cryptos
    .sort((a, b) => parseFloat(b.percent_change_24h) - parseFloat(a.percent_change_24h))
    .slice(0, 3)
}

/**
 * Récupère les 3 cryptos avec le volume le plus élevé
 * @returns {Promise<Array<Cryptos>>}
 */
export async function getTopVolumeCoin(): Promise<Array<Cryptos>> {
  const cryptos = await getCryptos()
  return cryptos.sort((a, b) => b.volume24 - a.volume24).slice(0, 3)
}

/**
 * Récupère les informations d'une crypto
 * @param nameid
 * @returns
 */
export async function getCrypto(id: number): Promise<Crypto> {
  const res = await fetch(`https://api.coinlore.net/api/ticker/?id=${id}`)
  const data = await res.json()
  return data[0]
}
