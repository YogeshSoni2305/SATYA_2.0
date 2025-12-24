export default async function handler(req, res) {
  const response = await fetch(
    "https://satya-pdiq.onrender.com/cron/ping",
    {
      method: "POST",
      headers: {
        "x-cron-secret": process.env.CRON_SECRET
      }
    }
  )

  const data = await response.json()
  res.status(200).json(data)
}
