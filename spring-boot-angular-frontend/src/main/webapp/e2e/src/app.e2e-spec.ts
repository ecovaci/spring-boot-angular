import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeAll(() => {
        page = new AppPage();
    });


    it('should navigate to login page', (done) => {
        page.navigateToLogin().then(function () {
            // Promise is resolved
            done(); // Success
        }, function (reason) {
            // Promise is rejected
            done.fail(reason);
        });
    });


    it('should click on login button', (done) => {
        page.clickOnLoginButton().then(function () {
            // Promise is resolved
            console.log("Login success");
            done(); // Success
        }, function (reason) {
            // Promise is rejected
            done.fail(reason);
        });
    });

    it('should navigate to users page', (done) => {
        page.navigateToUsers().then(function () {
            // Promise is resolved
            done(); // Success
        }, function (reason) {
            // Promise is rejected
            done.fail(reason);
        });
    });

    it('should find the title', (done) => {
        page.checkTitle().then(function (result) {
            if (result) {
                done();
            } else {
                done.fail('Title not found');
            }
            // Success
        }, function (reason) {
            // Promise is rejected
            done.fail(reason);
        });
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

});
