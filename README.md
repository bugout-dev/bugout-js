# bugout-js

JavaScript client library for Bugout API

## Setup

-   Install package with npm

```bash
npm install --save @bugout/bugout-js
```

-   Example of usage, just fill `token`, `journal_id` and `entry_id` with proper values from your account. Or remove unnecessary variables and API calls.

```typescript
import BugoutClient, { BugoutTypes } from "@bugout/bugout-js"

const bugout = new BugoutClient()

bugout.pingBrood().then((response: BugoutTypes.BugoutPing) => console.log(response))

const token: string = ""
const journalId: string = ""
const entryId: string = ""

bugout
	.getUser(token)
	.then((response: BugoutTypes.BugoutUser) => {
		const user = response
		console.log(`User name is ${user.username}`)
	})
	.catch(() => console.log("An error occurred"))

bugout
	.getEntry(token, journalId, entryId)
	.then((response: BugoutTypes.BugoutJournalEntry) => console.log(JSON.stringify(response, null, 2)))
	.catch(() => console.log("An error occurred"))

bugout
	.search(token, journalId, "your query")
	.then((response: BugoutTypes.BugoutSearchResults) => console.log(JSON.stringify(response, null, 2)))
	.catch(() => console.log("An error occurred"))
```
