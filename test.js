import { t, Selector } from 'testcafe';

fixture `podium webchat`
  .page('https://demo.podium.tools/qa-webchat-lorw')


 constructor() {
    this.sendButton = Selector('button').withText('Send')
    this.webchatButton = Selector('button').nth(0)
    this.locationSelect = Selector('button').withText('Scoreboard Sports')
    this.locationSearch = (Selector('input').withAttribute('name', 'Search Locations')
    this.locationClear = Selector('button').withAttribute('class', 'SearchInput__Reset')
	}


test
('WebChat Functionality: Open and Close| C1', async t => {
	await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.switchToIframe('#podium-modal')
	let exists = await Selector('h1').withText('Select Location').exists
	await t.expect(exists).eql(true)
  await t.switchToIframe('#podium-bubble')
	await t.click(this.webchatButton)
	exists = await Selector('h1').withText('Select Location').exists
	await t.expect(exists).eql(false)
})

test
('WebChat Functionality: Select Location| C2', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.switchToIframe('#podium-modal')
  let exists = await Selector('h1').withText('Select Location').exists
  await t.expect(exists).eql(true)
  await t.click(Selector('button').nth(0))
  exists = await Selector('h1').withText('Select Location').exists
  await t.expect(exists).eql(false)
})

test
('Verify Expected Locations| C3', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.switchToIframe('#podium-modal')
  let count = await this.locationSelect.count
  await t.expect(count).eql(3)
})

test
('View Legal Docs| C4', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.click(Selector('a').withText('use is subject to terms'))
})

test
('Webchat Functionality: Back Button| C5', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.switchToIframe('#podium-modal')
  await t.click(this.locationSelect)
  await t.click(Selector('button').withAttribute('alt', "Back to Location List"))
  let exists = await sendButton.exists
  await t.expect(exists).eql(false)
})

test
('Verify Send Fails When Imcomplete| C6', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.click(this.locationSelect)
  
  await t.click(this.sendButton)
  let exists = this.sendButton.exists
  await t.expect(exists).eql(true)
})

test
('Verify Cleared Information for Location| C7', async t => {
  await t.switchToIframe('#podium-bubble').click(this.webchatButton)
  await t.typeText(this.locationSearch, '93065')
  await t.click(this.locationClear)
  await t.expect(await this.locationClear.exists).eql(false)
})
