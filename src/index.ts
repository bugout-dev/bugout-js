import { BROODURL, SPIREURL } from './constants'
import Client from './client'
import { ClientInterface } from './interfaces'
import { Options } from './types'

const module = (
    options: Options = {
        apiUrls: { broodURL: BROODURL, spireURL: SPIREURL },
    },
): ClientInterface => (
    Client(options)
)

export { module as BugoutClient }

export default {}
