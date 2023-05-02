import { NextApiRequest, NextApiResponse } from 'next'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'

export default function handler(
    request: NextApiRequest, response: NextApiResponse
) {
    const irFirebaseConfig = new IrFirebaseConfig()
    const clientKey = request.query.clientKey as string
    const clientFirebaseConfig = irFirebaseConfig.getFirebaseConfig(clientKey)

    if (!clientFirebaseConfig) {
        response.status(500).json({ error: 'Firebase config not found' })
        return
    }
    response.status(200).json({ firebaseConfig: clientFirebaseConfig })
}
