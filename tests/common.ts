import { expect } from "chai"
import "mocha"

import BugoutClient, { BugoutTypes } from "../src/app"

export const bugout = new BugoutClient("http://127.0.0.1:7474", "http://127.0.0.1:7475")

export const testUsername = "bug"
export const testUserPassword = "bug1"
export const testUserToken: string = "678d0954-371c-48a6-a7ec-6d7abecd094d"
export const testGroupId = "46bf0ebe-116b-47c0-9be7-76278c67a427"
export const testJournalId = "3c815788-7239-4d17-a3dc-c428a9460cba"
export const newEntryTitle = "Test title"
export const testEntryId = "037c4716-6178-4efd-acf0-ae681f49132f"

describe("Ping tests", () => {
	it("pingBrood - should return ok", () => {
		return bugout.pingBrood().then((response: BugoutTypes.BugoutPing) => {
			expect(response.status).to.equal("ok")
		})
	})
	it("pingSpire - should return ok", () => {
		return bugout.pingSpire().then((response: BugoutTypes.BugoutPing) => {
			expect(response.status).to.equal("ok")
		})
	})
})
