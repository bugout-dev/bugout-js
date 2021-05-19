import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUserToken } from "./common"

const testResourceId = "be892ed0-845e-414d-8947-dc902c6df7df"
const testHolderId = "46bf0ebe-116b-47c0-9be7-76278c67a427"
const testHolderType = "group"
const testPermissions = ["admin", "read", "create", "update", "delete"]

describe("Resource tests", () => {
	it("listResources - should return list of resources", () => {
		return bugout
			.listResources(testUserToken)
			.then((response: BugoutTypes.BugoutResources) => {
				expect(response.resources).to.be.an("array")
			})
			.catch(() => console.log("err - listResources"))
	})

	it(`getResource - should return resource id = ${testResourceId}`, () => {
		return bugout
			.getResource(testUserToken, testResourceId)
			.then((response: BugoutTypes.BugoutResource) => {
				expect(response.id).to.equal(testResourceId)
			})
			.catch(() => console.log("err - getResource"))
	})

	// it("createResouce")

	it(`addHolderToResource - should return holder id = ${testHolderId}`, () => {
		return bugout
			.addHolderToResource(testUserToken, testResourceId, testHolderId, testHolderType, testPermissions)
			.then((response: BugoutTypes.BugoutResourceHolders) => {
				expect(response.holders[0].id).to.equal(testHolderId)
			})
			.catch(() => console.log("err - addHolderToResource"))
	})
	
	it(`removeHolderFromResource - should return holder id = ${testHolderId}`, () => {
		return bugout
			.removeHolderFromResource(testUserToken, testResourceId, testHolderId, testHolderType, testPermissions)
			.then((response: BugoutTypes.BugoutResourceHolders) => {
				expect(response.holders[0].id).to.equal(testHolderId)
			})
			.catch(() => console.log("err - removeHolderFromResource"))
	})
})
