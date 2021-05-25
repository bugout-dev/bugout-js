import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUserToken } from "./common"

const testResourceId = "bb34c87e-5c7d-4296-8c4b-1b50436ce633"
const testHolderId = "46bf0ebe-116b-47c0-9be7-76278c67a427"
const testHolderType = "group"
const testPermissions = ["admin", "read", "create", "update", "delete"]
const testNewResourceName = "New test resource"
const testNewResourceAppID = "random-app-id-1"

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

	it("createResource, listResources with filter by external, then deleteResource", () => {
		return bugout
			.createResource(
				testUserToken,
				testNewResourceName,
				testNewResourceAppID,
				"test description",
				"test_external_id"
			)
			.then((response: BugoutTypes.BugoutResource) => {
				expect(response.name).to.equal(testNewResourceName)
				bugout
					.listResources(testUserToken, undefined, testNewResourceAppID)
					.then((response_list: BugoutTypes.BugoutResources) => {
						expect(response_list.resources.length).to.equal(1)
						expect(response_list.resources[0].application_id).to.equal(testNewResourceAppID)
						bugout
							.deleteResource(testUserToken, response.id)
							.then((response_delete) => {
								expect(response_delete.id).to.equal(response.id)
							})
							.catch(() => console.log("err - deleteResource"))
					})
					.catch(() => console.log("err - listResources"))
			})
			.catch(() => console.log("err - createResource"))
	})

	it(`addHolderToResource - should return holder id = ${testHolderId}`, () => {
		return bugout
			.addHolderToResource(testUserToken, testResourceId, testHolderId, testHolderType, testPermissions)
			.then((response: BugoutTypes.BugoutResourceHolders) => {
				const new_holder = response.holders.filter((holder) => holder.id === testHolderId)
				expect(new_holder.length).to.equal(1)
			})
			.catch(() => console.log("err - addHolderToResource"))
	})

	it(`removeHolderFromResource - should return holder id = ${testHolderId}`, () => {
		return bugout
			.removeHolderFromResource(testUserToken, testResourceId, testHolderId, testHolderType, testPermissions)
			.then((response: BugoutTypes.BugoutResourceHolders) => {
				const new_holder = response.holders.filter((holder) => holder.id === testHolderId)
				expect(new_holder.length).to.equal(0)
			})
			.catch(() => console.log("err - removeHolderFromResource"))
	})
})
