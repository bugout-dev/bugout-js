import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUserToken, testGroupId } from "./common"

const testNewGroupName = "test-group"

describe("Groups tests", () => {
	it(`getGroup - should return group id = ${testGroupId}`, () => {
		return bugout
			.getGroup(testUserToken, testGroupId)
			.then((response: BugoutTypes.BugoutGroup) => {
				expect(response.id).to.equal(testGroupId)
			})
			.catch(() => console.log("err - getGroup"))
	})

	it(`findGroup - should return group id = ${testGroupId}`, () => {
		return bugout
			.findGroup(testUserToken, testGroupId)
			.then((response: BugoutTypes.BugoutGroup) => {
				expect(response.id).to.equal(testGroupId)
			})
			.catch(() => console.log("err - findGroup"))
	})

	it(`createGroup - should return group name = ${testNewGroupName}`, () => {
		return bugout
			.createGroup(testUserToken, testNewGroupName)
			.then((response: BugoutTypes.BugoutGroup) => {
				expect(response.group_name).to.equal(testNewGroupName)
			})
			.catch(() => console.log("err - createGroup"))
	})
})
