import { expect } from "chai"
import "mocha"

import { BugoutTypes } from "../src/app"
import { bugout, testUsername, testUserPassword, testUserToken, newUsername } from "./common"

const testFindUsername = "out"
const testFindUserId = "c8cfd630-8816-4f5d-b9e3-ad99885598cc"

describe("User tests", () => {
	it("getUser - should return username = bug", () => {
		return bugout
			.getUser(testUserToken)
			.then((response: BugoutTypes.BugoutUser) => {
				expect(response.username).to.equal(testUsername)
			})
			.catch(() => console.log("err - getUser"))
	})

	// it(`createUser - should return username = ${newUsername}`, () => {
	// 	return bugout
	// 		.createUser(newUsername, `${newUsername}@example.com`, "superl123on!assword")
	// 		.then((response: BugoutTypes.BugoutUser) => {
	// 			expect(response.username).to.equal("bugauto4")
	// 		})
	// 		.catch(() => console.log("err - createUser"))
	// })

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
