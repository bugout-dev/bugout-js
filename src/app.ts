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
	async createUser(username: string, email: string, password: string, firstName?: string, lastName?: string): Promise<BugoutTypes.BugoutUser> {
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}
		let data = `username=${username}&email=${email}&password=${password}`
		if (firstName !== undefined) {
			data = `${data}&first_name=${firstName}`
		}
		if (lastName !== undefined) {
			data = `${data}&last_name=${lastName}`
		}
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

	async updateUser(token: string, firstName?: string, lastName?: string): Promise<BugoutTypes.BugoutUser> {
		let data = ""

		if (firstName !== undefined && lastName !== undefined) {
			data = `first_name=${firstName}&last_name=${lastName}`
		} else if (firstName !== undefined) {
			data = `first_name=${firstName}`
		} else if (lastName !== undefined) {
			data = `last_name=${lastName}`
		} else {
			throw new Error(`updateUser: At least one of firstName (${firstName}) or lastName (${lastName}) must be defined`)
		}

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Bearer ${token}`
			}
		}

		const response = await this.caller(this.broodClient.put("/user", data, config))
		return BugoutTypes.userUnpacker(response)
	}

	async findUser(token: string, userId: string): Promise<BugoutTypes.BugoutUser> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: {
				user_id: userId
			}
		}
		const response = await this.caller(this.broodClient.get("/user/find", config))
		return BugoutTypes.userUnpacker(response)
	}

	async changePassword(token: string, currentPassword: string, newPassword: string): Promise<BugoutTypes.BugoutUser> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = `current_password=${currentPassword}&new_password=${newPassword}`
		const response = await this.caller(this.broodClient.post("/password/change", data, config))
		return BugoutTypes.userUnpacker(response)
	}

	async restorePassword(email: string): Promise<BugoutTypes.BugoutPasswordRestore> {
		const data = `email=${email}`
		const response = await this.caller(this.broodClient.post("/password/restore", data))
		return { reset_password: response.reset_password } as BugoutTypes.BugoutPasswordRestore
	}

	async resetPassword(resetId: string, newPassword: string): Promise<BugoutTypes.BugoutUser> {
		const data = `reset_id=${resetId}&new_password=${newPassword}`
		const response = await this.caller(this.broodClient.post("/password/reset", data))
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

	async findGroup(token: string, groupId: string): Promise<BugoutTypes.BugoutGroup> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: {
				group_id: groupId
			}
		}
		const response = await this.caller(this.broodClient.get("/groups/find", config))
		return BugoutTypes.groupUnpacker(response)
	}

	async createGroup(token: string, groupName: string): Promise<BugoutTypes.BugoutGroup> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = `group_name=${groupName}`
		const response = await this.caller(this.broodClient.post("/group", data, config))
		return BugoutTypes.groupUnpacker(response)
	}

	async setUserInGroup(token: string, groupId: string, userType: string, username?: string, email?: string) {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		let data = `user_type=${userType}`
		if (username) {
			data += `&username=${username}`
		}
		if (email) {
			data += `&email=${email}`
		}
		const response = await this.caller(this.broodClient.post(`/group/${groupId}/role`, data, config))
		return BugoutTypes.groupUserUnpacker(response)
	}

	// Application handlers
	async createApplication(
		token: string,
		name: string,
		description: string,
		groupId: string
	): Promise<BugoutTypes.BugoutApplication> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = `name=${name}&description=${description}&group_id=${groupId}`
		const response = await this.caller(this.broodClient.post("/applications", data, config))
		return BugoutTypes.applicationUnpacker(response)
	}

	async getApplication(
		token: string,
		applicationId: string
	): Promise<BugoutTypes.BugoutApplication> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.get(`/applications/${applicationId}`, config))
		return BugoutTypes.applicationUnpacker(response)
	}

	async listApplications(
		token: string,
		groupId?: string
	): Promise<BugoutTypes.BugoutApplications> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: {
				group_id: groupId,
			}
		}
		const response = await this.caller(this.broodClient.get("/applications", config))
		return BugoutTypes.applicationsUnpacker(response)
	}

	async deleteApplication(
		token: string,
		applicationId: string
	): Promise<BugoutTypes.BugoutApplication> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.delete(`/applications/${applicationId}`, config))
		return BugoutTypes.applicationUnpacker(response)
	}

	// Resource handlers
	async createResource(
		token: string,
		applicationId: string,
		resourceData: any
	): Promise<BugoutTypes.BugoutResource> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = {
			application_id: applicationId,
			resource_data: resourceData
		}
		const response = await this.caller(this.broodClient.post("/resources", data, config))
		return BugoutTypes.resourceUnpacker(response)
	}

	async listResources(
		token: string,
		params?: any,
	): Promise<BugoutTypes.BugoutResources> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			params: params
		}
		const response = await this.caller(this.broodClient.get("/resources", config))
		return BugoutTypes.resourcesUnpacker(response)
	}

	async getResource(token: string, resourceId: string): Promise<BugoutTypes.BugoutResource> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.get(`/resources/${resourceId}`, config))
		return BugoutTypes.resourceUnpacker(response)
	}

	async updateResource(
		token: string,
		resourceId: string,
		update: any,
		dropKeys: string[]
	): Promise<BugoutTypes.BugoutResource> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = {
			update: update,
			drop_keys: dropKeys
		}
		const response = await this.caller(this.broodClient.put(`/resources/${resourceId}`, data, config))
		return BugoutTypes.resourceUnpacker(response)
	}

	async deleteResource(token: string, resourceId: string): Promise<BugoutTypes.BugoutResource> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const response = await this.caller(this.broodClient.delete(`/resources/${resourceId}`, config))
		return BugoutTypes.resourceUnpacker(response)
	}

	async addHolderToResource(
		token: string,
		resourceId: string,
		holderId: string,
		holderType: string,
		permissions: string[]
	): Promise<BugoutTypes.BugoutResourceHolders> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = {
			holder_id: holderId,
			holder_type: holderType,
			permissions: permissions
		}
		const response = await this.caller(this.broodClient.post(`/resources/${resourceId}/holders`, data, config))
		return BugoutTypes.resourceHoldersUnpacker(response)
	}

	async removeHolderFromResource(
		token: string,
		resourceId: string,
		holderId: string,
		holderType: string,
		permissions: string[]
	): Promise<BugoutTypes.BugoutResourceHolders> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				holder_id: holderId,
				holder_type: holderType,
				permissions: permissions
			}
		}
		const response = await this.caller(this.broodClient.delete(`/resources/${resourceId}/holders`, config))
		return BugoutTypes.resourceHoldersUnpacker(response)
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

	// Journal entry tags handlers
	async createTags(token: string, journalId: string, entryId: string, tags: string[]): Promise<string[]> {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		const data = {
			tags: tags
		}
		const response = await this.caller(this.spireClient.post(`/journals/${journalId}/entries/${entryId}/tags`, data, config))
		return response
	}

	// Search handler
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
