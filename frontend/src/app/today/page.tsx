'use client'

import { useEffect, useState } from 'react'

type Reservation = {
  id: number
  name: string
  time: string
  party_size: number
  vip: boolean
  allergies: string | null
  special_request: string | null
  occasion: string | null
}

export default function TodayReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]) // Garantir que seja um array vazio por padrão

  useEffect(() => {
    fetch('http://localhost:8000/reservations/today/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReservations(data)
        } else {
          console.error('Unexpected data format:', data)
        }
      })
      .catch((err) => {
        console.error('Error fetching reservations:', err)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Today's Reservations
        </h1>

        {reservations.length === 0 ? (
          <p className="text-gray-500">No reservations for today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {reservation.name}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Party Size:</span>{' '}
                  {reservation.party_size}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">VIP:</span>{' '}
                  {reservation.vip ? 'Yes' : 'No'}
                </p>
                {reservation.occasion && (
                  <p className="text-gray-600">
                    <span className="font-medium">Occasion:</span>{' '}
                    {reservation.occasion}
                  </p>
                )}
                {reservation.special_request && (
                  <p className="text-gray-600">
                    <span className="font-medium">Special Request:</span>{' '}
                    {reservation.special_request}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

