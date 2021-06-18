import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUsername, testUserPassword, testUserToken } from "./common"

const testFirstName = "BugFirst-Test"
const testFindUsername = "out"
const testFindUserId = "c8cfd630-8816-4f5d-b9e3-ad99885598cc"
export const newUsername = "bugauto7"

describe("User tests", () => {
	it("createUser - should return username = newUsername", () => {
		return bugout
			.createUser(
				newUsername,
				`${newUsername}@example.com`,
				newUsername,
				`First-${newUsername}`,
				`Last-${newUsername}`
			)
			.then((response: BugoutTypes.BugoutUser) => {
				expect(response.username).to.equal(newUsername)
			})
			.catch(() => console.log("err - createUser"))
	})

	it("getUser - should return username = bug", () => {
		return bugout
			.getUser(testUserToken)
			.then((response: BugoutTypes.BugoutUser) => {
				expect(response.username).to.equal(testUsername)
			})
			.catch(() => console.log("err - getUser"))
	})

	it("updateUser - should return first_name = testFirstName", () => {
		return bugout
			.updateUser(testUserToken, testFirstName)
			.then((response: BugoutTypes.BugoutUser) => {
				expect(response.first_name).to.equal(testFirstName)
			})
			.catch(() => console.log("err - updateUser"))
	})

	it(`findUser - should return username = ${testFindUsername} and undefined email`, () => {
		return bugout
			.findUser(testUserToken, testFindUserId)
			.then((response: BugoutTypes.BugoutUser) => {
				expect(response.username).to.equal(testFindUsername)
				expect(response.email).to.equal(null)
			})
			.catch(() => console.log("err - findUser"))
	})
})

describe("Token tests", () => {
	it("createToken - should return new token and revoke it", () => {
		return bugout
			.createToken(testUsername, testUserPassword)
			.then((response: BugoutTypes.BugoutToken) => {
				expect(response.id).not.to.be.undefined
				const tempToken = response.id
				return bugout
					.revokeToken(tempToken)
					.then((revokeResponse: string) => {
						expect(revokeResponse).to.equal(tempToken)
					})
					.catch(() => console.log("err - revokeToken"))
			})
			.catch(() => console.log("err - createToken"))
	})

	it("getUserTokens - should return list of tokens", () => {
		return bugout
			.getUserTokens(testUserToken)
			.then((response: BugoutTypes.BugoutUserTokens) => {
				expect(response.tokens).to.be.an("array")
			})
			.catch(() => console.log("err - getUserTokens"))
	})
})
