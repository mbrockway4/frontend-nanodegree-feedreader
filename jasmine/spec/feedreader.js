/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has Name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                 expect(feed.name).not.toBe("");

            });
        });
    });

    describe('The menu', function() {
       
        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Change when clicked', function() {
            $('.menu-icon-link').trigger('click')
            expect($('.menu-hidden').is(':visible')).toBe(false); 
        });

        it('Change when clicked again', function() {
            $('.menu-icon-link').trigger('click')
            expect($('.menu-hidden').is(':visible')).toBe(true); 
        });


    });
    describe('Initial Entries', function() {
       

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
            });

        it('has single entry', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        var firstFeed;
        var secondFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        it('has changed', function(done) {
            secondFeed = $('.feed').html();
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });
});