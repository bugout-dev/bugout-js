import { BugoutClient } from './index'

jest.setTimeout(30000)

const testUsername = 'mher'
const testPassword = 'pass1234'
const bugout = BugoutClient()

describe('SDK methods', () => {
    test('ping', async () => {
        const ping = await bugout.ping()

        expect(ping).toEqual(expect.objectContaining({
            brood: {
                body: expect.any(Object),
                url: expect.any(String),
                code: expect.any(Number),
            },
            spire: {
                body: expect.any(Object),
                url: expect.any(String),
                code: expect.any(Number),
            },
        }))
    })

    test('login existing user', async () => {
        const authInfo = await bugout.login(testUsername, testPassword)

        expect(authInfo).toEqual(expect.objectContaining({
            access_token: expect.any(String),
            token_type: expect.any(String),
        }))
    })
    test('user actions', () => {
        const user = bugout.user()

        expect(user.getAllJournals).toBeDefined()
        expect(user.createJournal).toBeDefined()
        expect(user.deleteJournal).toBeDefined()
        expect(user.getEntriesByJournal).toBeDefined()
        expect(user.searchEntriesByJournal).toBeDefined()
        expect(user.getEntry).toBeDefined()
        expect(user.createEntry).toBeDefined()
        expect(user.updateEntry).toBeDefined()
        expect(user.deleteEntry).toBeDefined()
        expect(user.createTag).toBeDefined()
        expect(user.getTags).toBeDefined()
        expect(user.deleteTags).toBeDefined()
    })
})

describe('User API', () => {
    test('journal', async () => {
        await bugout.login(testUsername, testPassword)

        const user = bugout.user()
        const jestJournal = await user.createJournal('jestJournal')
        const journals = await user.getAllJournals()
        const deleteJournal = await user.deleteJournal(jestJournal.data.id)

        expect(jestJournal.data).toBeDefined()

        expect(jestJournal.data).toEqual(expect.objectContaining({
            bugout_user_id: expect.any(String),
            created_at: expect.any(String),
            holder_ids: expect.any(Array),
            id: expect.any(String),
            name: expect.any(String),
            updated_at: expect.any(String),
        }))

        expect(journals.data).toBeDefined()

        expect(journals.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    bugout_user_id: expect.any(String),
                    created_at: expect.any(String),
                    holder_ids: expect.any(Array),
                    id: expect.any(String),
                    name: expect.any(String),
                    updated_at: expect.any(String),
                }),
            ]),
        )

        expect(deleteJournal.data.id).toEqual(jestJournal.data.id)
    })

    test('entry', async () => {
        await bugout.login(testUsername, testPassword)

        const user = bugout.user()
        const jestJournal = await user.createJournal('jestJournalForEntry')

        expect(jestJournal.data.id).toBeDefined()

        const jestEntry = await user.createEntry(jestJournal.data.id, {
            title: 'jestEntry1',
            content: 'jestContent',
        })

        const updateEntry = await user.updateEntry(
            jestJournal.data.id,
            jestEntry.data.id,
            {
                title: 'jestUpdateEntry',
                content: 'jestUpdateContent',
            },
        )
        const deleteEntry = await user.deleteEntry(
            jestJournal.data.id,
            jestEntry.data.id,
        )

        await user.deleteJournal(jestJournal.data.id)
        expect(jestEntry.data).toBeDefined()
        expect(jestEntry.data.title).toEqual('jestEntry1')
        expect(updateEntry.data.title).toEqual('jestUpdateEntry')
        expect(jestEntry.data.content).toEqual('jestContent')
        expect(updateEntry.data.content).toEqual('jestUpdateContent')
        expect(deleteEntry.data.id).toEqual(jestEntry.data.id)
    })

    test('tags', async () => {
        await bugout.login(testUsername, testPassword)

        const user = bugout.user()
        const jestJournal = await user.createJournal('jestJournalForTags')
        const jestEntry = await user.createEntry(jestJournal.data.id, {
            title: 'jestEntryTag',
            content: 'jestContentTag',
        })
        const tag = await user.createTag(
            jestJournal.data.id,
            jestEntry.data.id,
            ['jestTag'],
        )
        const tags = await user.getTags(
            jestJournal.data.id,
            jestEntry.data.id,
        )
        const deleteTag = await user.deleteTags(
            jestJournal.data.id,
            jestEntry.data.id,
            'jestTag',
        )

        await user.deleteEntry(
            jestJournal.data.id,
            jestEntry.data.id,
        )
        await user.deleteJournal(jestJournal.data.id)

        expect(tag.data).toEqual(
            expect.arrayContaining([{
                name: 'jestTag',
            }]),
        )
        expect(tags.data).toEqual(
            expect.objectContaining({
                journal_id: jestJournal.data.id,
                entry_id: jestEntry.data.id,
                tags: expect.any(Array),
            }),
        )
        expect(deleteTag.data).toEqual(
            expect.objectContaining({
                journal_id: jestJournal.data.id,
                entry_id: jestEntry.data.id,
                tags: expect.any(Array),
            }),
        )
    })
})
