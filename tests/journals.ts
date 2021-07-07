import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUserToken, testJournalId, newEntryTitle, testEntryId, testEntryNewTag } from "./common"

describe("Journals tests", () => {
	it(`getJournal - should return journal id = ${testJournalId}`, () => {
		return bugout
			.getJournal(testUserToken, testJournalId)
			.then((response: BugoutTypes.BugoutJournal) => {
				expect(response.id).to.equal(testJournalId)
			})
			.catch(() => console.log("err - getJournal"))
	})
	it("listJournals - should return list of journals", () => {
		return bugout
			.listJournals(testUserToken)
			.then((response: BugoutTypes.BugoutJournals) => {
				expect(response.journals).to.be.an("array")
			})
			.catch(() => console.log("err - listJournals"))
	})
})

describe("Entries tests", () => {
	it(`createEntry - should return entry title = ${newEntryTitle}`, () => {
		return bugout
			.createEntry(
				testUserToken,
				testJournalId,
				newEntryTitle,
				"Test content",
				["tagA", "tagB"],
				"test context url",
				"test context id",
				"return bugout"
			)
			.then((response: BugoutTypes.BugoutJournalEntry) => {
				expect(response.title).to.equal(newEntryTitle)
			})
			.catch(() => console.log("err - createEntry"))
	})
	it(`getEntry - should return entry id = ${testEntryId}`, () => {
		return bugout
			.getEntry(testUserToken, testJournalId, testEntryId)
			.then((response: BugoutTypes.BugoutJournalEntry) => {
				expect(response.id).to.equal(testEntryId)
			})
			.catch(() => console.log("err - getEntry"))
	})
	it("getEntries - should return list of entries", () => {
		return bugout
			.getEntries(testUserToken, testJournalId)
			.then((response: BugoutTypes.BugoutJournalEntries) => {
				expect(response.entries).to.be.an("array")
			})
			.catch(() => console.log("err - listJournals"))
	})
	it("getEntryContent - should return not undefined", () => {
		return bugout
			.getEntryContent(testUserToken, testJournalId, testEntryId)
			.then((response: BugoutTypes.BugoutJournalEntryContent) => {
				expect(response).not.to.equal(undefined)
			})
			.catch(() => console.log("err - getEntryContent"))
	})
	it(`updateEntry - should return entry id = ${testEntryId}`, () => {
		return bugout
			.updateEntry(testUserToken, testJournalId, testEntryId, "New title", "New content", ["tagA"])
			.then((response: BugoutTypes.BugoutJournalEntry) => {
				expect(response.id).to.equal(testEntryId)
			})
			.catch(() => console.log("err - updateEntry"))
	})
	it(`createTags - should return list with tag = ${testEntryNewTag}`, () => {
		return bugout
			.createTags(testUserToken, testJournalId, testEntryId, [testEntryNewTag])
			.then((response: string[]) => {
				expect(response).to.equal([testEntryNewTag])
			})
			.catch(() => console.log("err - createTags"))
	})
	it("search - should return list of entries", () => {
		return bugout
			.search(testUserToken, testJournalId, "your query")
			.then((response: BugoutTypes.BugoutSearchResults) => {
				expect(response.results).to.be.an("array")
			})
			.catch(() => console.log("err - listJournals"))
	})
})
