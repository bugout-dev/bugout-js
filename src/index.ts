import Bugout, {ApiUrls} from './bugout.js'

const broodURL = 'https://auth.bugout.dev'
const spireURL = 'https://spire.bugout.dev'


const BugoutClient = (
    bugoutToken?: string,
    bugoutClientID?: string, 
    ApiUrls?: ApiUrls,
    ) => {
// ToDo here must be request tu auth api
    return new Bugout({broodURL, spireURL})    
}

export {BugoutClient as BugoutClient}