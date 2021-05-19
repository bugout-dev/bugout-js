import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUserToken, testGroupId } from "./common"

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
})
