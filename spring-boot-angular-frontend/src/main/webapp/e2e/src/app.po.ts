import {browser, by, element} from 'protractor';

export class AppPage {

    navigateToLogin() {
        return browser.get(browser.baseUrl + "/ng-app/login") as Promise<any>;
    }

    clickOnLoginButton() {
        return browser.driver.manage().window().setSize(1638, 920)
            .then(function () {
                return element(by.id("username")).sendKeys("john");
            })
            .then(function () {
                return element(by.id("password")).sendKeys("123");
            })
            .then(function () {
                return element(by.id("form-login-btn")).click();
            })
    }

    navigateToUsers () {
        return browser.get(browser.baseUrl + "/ng-app/users/list") as Promise<any>;
    }

    checkTitle() {
        return browser.wait(function () {
            return element(by.id("user-list-title")).isPresent();
        }, 2000);
    }

}
