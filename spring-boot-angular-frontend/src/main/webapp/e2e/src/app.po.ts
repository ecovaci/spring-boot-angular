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
            .then(function () {
                return browser.wait(function () {
                    return element(by.id("home-component-id")).isPresent();
                }, 2000);
            });
    }

    navigateToUsers() {
        //return browser.setLocation("/ng-app/users/list");

        return browser.get(browser.baseUrl + "/ng-app/users/list").then(function () {
            return browser.wait(function () {
                return element(by.id("user-list-title")).isPresent();
            }, 2000);
        });
    }

    checkTitle() {
        return browser.wait(function () {
            return element(by.id("user-list-title")).isPresent();
        }, 2000);
    }

}
