import {BROODURL, SPIREURL} from './constants'
import BugoutClient from './bugoutClient'
import {ApiUrls} from './bugoutClient/bugoutClient'


const module = (
    ApiUrls: ApiUrls = {broodURL: BROODURL, spireURL: SPIREURL},
    bugoutToken?: string,
    bugoutClientID?: string
) => (
    BugoutClient(ApiUrls, bugoutToken, bugoutClientID)
)

export {module as BugoutClient}