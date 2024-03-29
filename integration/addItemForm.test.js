describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolistproject-additemform--add-item-form-base-example&viewMode=story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // Api from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});