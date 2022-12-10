Test Frameworks
===============

Objectives:
* Understand the purpose of a unit test framework
* Understand the purpose of a browser test framework
* (CORS - so you can make more server progress)


What are Test Frameworks
-----

* Framework to help us check that code is functioning correctly
* There are different frameworks for different parts of our software (server, client)
* Most languages have `assert`ions as a language feature
    * Example of writing a test without a framework or without `assert`
        * ```python
            expected = "my expected result"
            result = do_thing()
            if (result == expected) {
                print("it worked")
                add_test_to_passed_list('do_thing')
            } else {
                print(f'it failed - I expected {expected=} but I got {result=}')
                add_test_to_failed_list('do_thing', expected, result)
            }
            ```
    * With framework
        * ```python
            def test_do_thing() {
                assert do_thing() == "my expected result"
            }
            ```
* Unit test test individual functions (or specific functionality) without dependencies
    * Dependent services are normally "mocked" (key terminology)
    * Super fast feedback! (in seconds or minuets)
* Integration tests - test that a whole system, end to end, with all dependencies are working
    * e.g. with a full database + gui
    * Normally take a lot of resources and time (10's of minuets or hours)


PyTest (A unittest framework)
------

* [pytest.org](https://pytest.org/)
    * pytest: helps you write better programs
    * The pytest framework makes it easy to write small tests, yet scales to support complex functional testing for applications and libraries.

### TASK: run the basic PyTest example

```bash
# Create `pytest_example` folder
# Create `test_sample.py` file form https://pytest.org/
pip install pytest  # (only once)
pytest
# should run test_sample.py and produce an error
```

### TASK: Create some tests

* Create the following files
    * `example.py`
        * ```python
            def add(a, b):
                return 0

            def multiply(a, b):
                return 0
            ```
    * `test_example.py`
        * ```python
            from example import *

            def test_add():
                assert add(1, 2) == 3
                assert add(1, -2) == -1
                assert add(1000000000000000000, 2) == 1000000000000000002

            def test_multiply():
                assert False, "please implement the rest of this test"
            ```
* Add some positive tests for these functions
    * Think about possible values to test with 
        * (positive? negative? BIG numbers?)
* Add some erroneous tests for these functions
    * `add(2, "thing")` - you expect to generate an exception
        * https://docs.pytest.org/en/latest/how-to/assert.html#assertions-about-expected-exceptions
* Create a new function and some new test
    * Test for exceptions
    * `div(a, b)` -> `div(100, 0)`


### Task: Testing `jsonplaceholder`

* [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)
    * [guide](https://jsonplaceholder.typicode.com/guide/)
        * ```bash
            curl https://jsonplaceholder.typicode.com/posts/1
            # Important: resource will not be really updated on the server but it will be faked as if.
            curl -X POST -d '{"title": "foo", "body": "bar", "userId": "1"}' https://jsonplaceholder.typicode.com/posts
            curl -X DELETE https://jsonplaceholder.typicode.com/posts/1
            ```

```bash
pip install pytest requests
```

`test_jsonplaceholder.py` (pytest files must start with `test_`)
```python
"""
Complete the pytest tests below for https://jsonplaceholder.typicode.com/guide/
Test the endpoints by:
* making a request using the `requests library`
* Assert/Check/Verify some aspect of the data you get back is correct to the spec/examples
* use `breakpoint()` and `dir(response)` to debug the response object to get the `status` somehow

Hints (Components you will need - these are not in order):

    ITEM={"title": "foo", "body": "bar", "userId": "1"}
    response = requests.post(ENDPOINT + 'posts', json=ITEM)

    data = response.json()

    response = requests.delete(ENDPOINT + '???/???')

    assert data['id'] > 100

    assert response.??? == 200
"""
import requests

ENDPOINT="https://jsonplaceholder.typicode.com/"

def test_get_post_1():
    response = requests.get(ENDPOINT + 'posts/1')
    # Find out what the request should return with
    # curl https://jsonplaceholder.typicode.com/posts/1
    # Assert the right data is returned
    pass  # remove me

def test_create_post():
    # Post and item and assert the id created is greater than 100
    pass  # remove me

def test_delete_post_1():
    pass  # remove me
```

### Task: install plugin

* [pytest-html](https://pytest-html.readthedocs.io/)
    * `pip install pytest-html`
    * `pytest --html=report.html --self-contained-html`
* view generated report
    * `python3 -m http.server` or right-click + download
* Advanced (Optional)
    * Create a `pytest.ini` file
    * ```ini
        [pytest]
        addopts = --html=report.html --self-contained-html
        ```
    * Typing `pytest` will run automatically with those options

### Task: Debugger

* Change one of your tests so that it fails
* run pytest with the command below
* ```bash
    pytest --pdb
    ```
* Inspect the `response` object
    * `dir(???)` repl


### Task: Run individual tests for this project
```bash
# Run server on :8000
cd example_server
make run_local

# -- separate terminal

# Run individual test
cd test_server
pytest test_api.py::test_root
# look for more test names in `test_server/test_api.py`
```

### Framework Features
* Fixtures
    * Setup and teardown for data
    * ```python
        @pytest.fixture
        def ENDPOINT():
            yield "An object of some sort"

        @pytest.fixture
        def new_item(ENDPOINT):
            # create it before the test
            yield "???"
            # tidy up after test
        ```
* Plugins
    * https://docs.pytest.org/en/latest/reference/plugin_list.html
    * Task: look at this list ... why is this important?

### Caution: Cache files

* Cache files make me sad ... (I personally refer to them a 'file cancer')
* PyTest by default creates hidden cache files.
    * `__pycache__`, `.pytest_cache`
    * DO NOT COMMIT THESE TO YOUR REPO!
        * add these folder/files to `.gitignore`
    * Don't copy them when building containers (this can conflict with the container execution environment)
        * add these folders/files to `.dockerignore`


Jasmine (Javascript)
--------------------

* https://jasmine.github.io/
    * Look at the test example on the main page - note the similarities with `pytest` - all test have a name and perform some kind of assertion

### Task: Let's try Jasmine

* https://jasmine.github.io/setup/nodejs.html
* ```bash
    mkdir jasmine_example ; cd jasmine_example
    npm install --save-dev jasmine
    npx jasmine init
    npx jasmine examples
    npx jasmine
    # look in jasmine_example/spec/jasmine_examples/PlayerSpec.js
    ```



Other UnitTest Frameworks
-------------------------

* C#
    * [Get started with unit testing](https://docs.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing) in Visual Studio
* Java
    * [JUnit](https://junit.org/)
        * [User Guide - example](https://junit.org/junit5/docs/current/user-guide/#writing-tests)
* Javascript
    * [JavaScript unit testing frameworks in 2020: A comparison](https://raygun.com/blog/javascript-unit-testing-frameworks/)
        * https://jasmine.github.io/
        * https://mochajs.org/
        * https://github.com/avajs/ava
            * Async tests
        * https://jestjs.io/


Cypress (A Browser/End-to-End test Framework)
-------

* Demo full local cypress environment
* Technical:
    * The entire test suite runs in the browser in javascript - when finished it uploaded the results to the test orchestrator
* Terminology: Headless
    * Does not need to run the renderer - much lighter memory footprint and less processor time
    * Caution: this it NOT the same as an actual browser with a user. There are edge cases it can miss


### Task: Create a Cypress test to search with Google

* Setup (on gitpod without gui local - just an example) (normally you would run this heedlessly in containers)
    * ```bash
        mkdir cypress_test; cd cypress_test
        sudo apt-get update && sudo apt-get install -y PASTE_DEPENDENCIES  # https://docs.cypress.io/guides/continuous-integration/introduction#Ubuntu-Debian
        npm install cypress
        cp ${GITPOD_REPO_ROOTS}/test_client/cypress.config.js .
        ```
* Save as `cypress/google.spec.cy.js`
```javascript
describe('Google', () => {
    it('Search for university webpage and check university logo is present', () => {
        cy.visit("https://www.google.co.uk?&hl=en&lr=lang_en")
            // * Hint: "Terms and Conditions" must be accepted - click the 'Accept All' button
        // * Perform a google search for canterbury christ church university (with a spelling mistake)
            // type text into the right input box?
        // * Check that `canterbury.ac.uk` is somewhere in the returned list of searches
        // * Follow the google search link to the main university webpage and check the logo is visible
            // * Hint: "Cookie Popup" will block your way. Your test should deal with these
    });
});
/*
* Run with
    * Local Headless: `npx cypress run --spec cypress/google.spec.cy.js`
    * Container Headless: `make cypress_cmd CYPRESS_CMD="run --spec cypress/example.spec.cy.js"`
* https://docs.cypress.io/api/commands/
    * `.visit("https://site")`
    * `.contains("text on webpage")`
    * `.click()`
    * `.type("the text you want to type{enter}")`
    * `.get('???')`
        * `.get('input[title="???"]')`
        * `.get('#id_of_element')`
        * `.get('img[alt="???"')`
    * `.should('be.visible')`
    * `.scrollIntoView()`
*/
```


Other Browser/End-to-End test Frameworks
----------------------------------------

### Selenium

https://www.selenium.dev/
* Very established
* Technical
    * The test orcestrator runs in (almost) any language and communicates with the browser via a special binary network binding called selenium-driver
    * Each browser must install (at the system level) the special selenium driver

### puppeteer

https://developers.google.com/web/tools/puppeteer

Googles own headless browser test


Discussion: Selenium Vs Cypress
--------------------------------

Architecturally - which one would you choose and why?



Quiz
----

* https://b.socrative.com/login/student/
    * callaghan1818
* for teacher https://b.socrative.com/teacher/


Solutions
=========

<details>
<summary>jsonplaceholder Solution</summary>

```python
import requests

ENDPOINT="https://jsonplaceholder.typicode.com/"

def test_get_post_1():
    response = requests.get(ENDPOINT + 'posts/1')
    data = response.json()
    assert data == {'userId': 1, 'id': 1, 'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit', 'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'}

def test_create_post():
    ITEM={"title": "foo", "body": "bar", "userId": "1"}
    response = requests.post(ENDPOINT + 'posts', json=ITEM)
    data = response.json()
    assert data['id'] > 100

def test_delete_post_1():
    response = requests.delete(ENDPOINT + 'posts/1')
    assert response.status_code == 200

```
</details>

<details>
<summary>Cypress Solution</summary>

```javascript
describe('Google', () => {
	it('Search for university webpage and check university logo is present', () => {
		cy.visit("https://www.google.co.uk?&hl=en&lr=lang_en")
		cy.get('button').contains("Accept all").scrollIntoView().should('be.visible').click()
		cy.get('input[title="Search"]').should('be.visible').type("Canterbury christ chcurch uni{enter}")
		cy.contains("canterbury.ac.uk").click()
		cy.get("#onetrust-accept-btn-handler").click()
b		cy.get('img[alt="Canterbury Christ Church University Logo"]').should('be.visible')
	});
});
```
</details>

<details>
<summary>backup of questions</summary>
1.

Why don't we do all our web application testing with Browser test frameworks

They are difficult to construct

They are slow

They require lots of system resources to run

They do not detail where the precise issue/line may be
2.

Assertions:

Are a language feature

Can only be used in tests

Allow us to succinctly check for truthy-ness with a concise syntax

Can give more detail to failing tests

Assertions can typically be used anywhere in code. They are sometimes used to detect problematic runtime conditions.

"More detail" is a trap and a vague term - they do not give us more detail in themselfs, however they may point us to error cases 'sooner rather than later' and this may help debugging
3.

Headless

Is a framework

browser tests do not need to produce any user interact-able visuals

browsers use less system resources than normal browsers

Requires less code

"Requires less code" than what? This is vague.

A headless browser does not need to waste time rendering the screen for a real user and can save on resourse
4.

Which is better

Unit Tests

Browser Tests

Unit and Browser tests are both good

Unit and Browser tests are optional

Try telling a business that "Unit and Browser tests are optional".

You need both for all projects. Don't start a project without them!
5.

CORS is

A server framework

A server technique

A client framework

A security feature of modern browsers

Implemented with HTTP headers

Implemented with HTTP status codes
6.

A test report

Is a legal requirement

is useful for measuring developer performance

Is useful for developers when generated by CI

Is useful when generated by developers for managers

Managers dont use test-reports - Developers use them to identify where problems in the code are

"Developer Performance" who would anyone measure this?

"Legal requirement"? Have we ever mentioned the law in these lectures?
7.

Testing

It is possible to just write browser tests as your main job

Every developer must be able to write tests

Testing is normally done by another department

Tests can be added later in a projects lifecycle

This is bit of a trick question - Tests CAN be added later in a project lifecycle. This is often hard and as the code was not written with testability in mind and may need refactoring.

It is possible be employed specifically as a browser test expert. These testers are highly valued by organisations!

Developers that can't write tests don't get very far in their profession
8.

What should always be in .gitignore AND .dockerignore files

Makefile

node_modules

__pycache__ (if a python project)

*.js

README.md

Dockerfile

Test report folder

node_modules should never be comitted to a repo under any circumstance. this is megabytes of binary files!

Cache files should be ignored (why would we ever store these? they are temporary guff)

Test reports should never be commited, these are transient and can be regenerated. They are normally 1000's of lines long and this will contaminate your repo

The other files are legitmate files Makefile, Dockerfile, README.md and *.js are all possibly legitimate files.

The question was ALWAYS be in .gitignore AND .dockerignore some of those files could be in one of them



</details>