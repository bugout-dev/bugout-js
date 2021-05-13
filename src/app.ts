import axios, { AxiosInstance, AxiosResponse } from "axios"

import * as BugoutTypes from "./types"
import { bugoutBroodUrl, bugoutSpiredUrl } from "./constants"

export default class BugoutClient {
	private broodClient: AxiosInstance
	private spireClient: AxiosInstance

	constructor(public broodUrl: string = bugoutBroodUrl, public spireUrl: string = bugoutSpiredUrl) {
		this.broodClient = axios.create({ baseURL: broodUrl })
		this.spireClient = axios.create({ baseURL: spireUrl })
	}

	static get broodUrl(): string {
		return this.broodUrl
	}

	static get spireUrl(): string {
		return this.spireUrl
	}

	private async caller(request: any): Promise<any> {
		try {
			const response: AxiosResponse = await request
			return response.data
		} catch (err) {
			throw err
		}
	}

	async pingBrood(): Promise<BugoutTypes.BugoutPing> {
		const response = await this.caller(this.broodClient.get("/ping"))
		return { status: response.status } as BugoutTypes.BugoutPing
	}

	async pingSpire(): Promise<BugoutTypes.BugoutPing> {
		const response = await this.caller(this.spireClient.get("/ping"))
		return { status: response.status } as BugoutTypes.BugoutPing
	}

	// User handlers
	async createUser(username: string, email: string, password: string): Promise<BugoutTypes.BugoutUser> {
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		const data = `username=${username}&email=${email}&password=${password}`
		const response = await this.caller(this.broodClient.post("/user", data, config))
		return BugoutTypes.userUnpacker(response)
	}

	async getUser(token: string): Promise<BugoutTypes.BugoutUser> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.get("/user", config))
		return BugoutTypes.userUnpacker(response)
	}

	// Token handlers
	async createToken(username: string, password: string): Promise<BugoutTypes.BugoutToken> {
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		const data = `username=${username}&password=${password}`
		const response = await this.caller(this.broodClient.post("/token", data, config))
		return BugoutTypes.tokenUnpacker(response)
	}

	async revokeToken(token: string): Promise<string> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.delete("/token", config))
		return response
	}

	async getUserTokens(token: string): Promise<BugoutTypes.BugoutUserTokens> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.get("/tokens", config))
		return BugoutTypes.userTokensUnpacker(response)
	}

	// Group handlers
	async getGroup(token: string, groupId: string): Promise<BugoutTypes.BugoutGroup> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.get(`/group/${groupId}`, config))
		return BugoutTypes.groupUnpacker(response)
	}

	// Journals handlers
	async listJournals(token: string): Promise<BugoutTypes.BugoutJournals> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.spireClient.get("/journals", config))
		return BugoutTypes.journalsUnpacker(response)
	}

	async getJournal(token: string, journalId: string): Promise<BugoutTypes.BugoutJournal> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.spireClient.get(`/journals/${journalId}`, config))
		return BugoutTypes.journalUnpacker(response)
	}

	// Journal entries handlers
	async createEntry(
		token: string,
		journalId: string,
		title: string,
		content: string,
		tags: string[],
		contextUrl?: string,
		contextId?: string,
		contextType?: string
	): Promise<BugoutTypes.BugoutJournalEntry> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = {
			title: title,
			content: content,
			tags: tags,
			context_url: contextUrl,
			context_id: contextId,
			context_type: contextType
		}
		const response = await this.caller(this.spireClient.post(`/journals/${journalId}/entries`, data, config))
		return BugoutTypes.journalEntryUnpacker(response)
	}

	async getEntry(token: string, journalId: string, entryId: string): Promise<BugoutTypes.BugoutJournalEntry> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.spireClient.get(`/journals/${journalId}/entries/${entryId}`, config))
		return BugoutTypes.journalEntryUnpacker(response)
	}

	async getEntries(token: string, journalId: string): Promise<BugoutTypes.BugoutJournalEntries> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.spireClient.get(`/journals/${journalId}/entries`, config))
		return BugoutTypes.journalEntriesUnpacker(response)
	}

	async getEntryContent(
		token: string,
		journalId: string,
		entryId: string
	): Promise<BugoutTypes.BugoutJournalEntryContent> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(
			this.spireClient.get(`/journals/${journalId}/entries/${entryId}/content`, config)
		)
		return { title: response.title, content: response.content } as BugoutTypes.BugoutJournalEntryContent
	}

	async updateEntry(
		token: string,
		journalId: string,
		entryId: string,
		title: string,
		content: string,
		tags: string[],
		tagsAction?: BugoutTypes.EntryUpdateTagActions
	): Promise<BugoutTypes.BugoutJournalEntry> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		if (tagsAction) {
			config["params"] = { tags_action: tagsAction }
		}
		const data = {
			title: title,
			content: content,
			tags: tags
		}
		const response = await this.caller(
			this.spireClient.put(`/journals/${journalId}/entries/${entryId}`, data, config)
		)
		return BugoutTypes.journalEntryUnpacker(response)
	}

	async search(
		token: string,
		journalId: string,
		query: string,
		filters: string[] = [],
		limit = 10,
		offset = 0,
		content = true
	): Promise<BugoutTypes.BugoutSearchResults> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: {
				q: query,
				filters: filters,
				limit: limit,
				offset: offset,
				content: content
			}
		}
		const response = await this.caller(this.spireClient.get(`/journals/${journalId}/search`, config))
		return BugoutTypes.searchResultsUnpacker(response)
	}
}

export { BugoutTypes as BugoutTypes }
