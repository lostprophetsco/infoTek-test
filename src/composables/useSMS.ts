import { SMS_PILOT_API_KEY } from '../api/mockData'

export const useSMS = () => {
  const sendSMS = async (phone: string, message: string) => {
    try {
      const url = new URL('https://smspilot.ru/api.php')
      url.searchParams.append('apikey', SMS_PILOT_API_KEY)
      url.searchParams.append('to', phone)
      url.searchParams.append('send', message)
      url.searchParams.append('format', 'json')

      const response = await fetch(url.toString())
      const data = await response.json()

      if (data.error) {
        console.error('SMS error:', data.error)
        return false
      }

      return true
    } catch (error) {
      console.error('SMS send failed:', error)
      return false
    }
  }

  return { sendSMS }
}
