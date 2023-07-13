const useFormat = () => {

    /**
     * 전화번호 하이픈 형식.
     */
    const toHyphenNumber = (phoneNumber: string) => {
        const match = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/)

        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`

        } else {
            return phoneNumber
        }
    }

    /**
     * 다운로드 URL 파싱.
     */
    const parseUrl = (url: string) => {
        const match = url.match(
            /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/log%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
        )
        if (!match) {
            return null
        }
        const { phoneNumber, date, fileName, params } = match.groups!

        const paramsMap = new URLSearchParams(params)
        const token = paramsMap.get('token')!
        const alt = paramsMap.get('alt')!

        return { phoneNumber, date, fileName, alt, token }
    }

    return {
        toHyphenNumber,
        parseUrl
    }
}

export default useFormat
