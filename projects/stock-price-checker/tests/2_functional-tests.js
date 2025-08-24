const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    let stock1 = 'GOOG';
    let stock2 = 'MSFT';

    test('Viewing one stock: GET request to /api/stock-prices/', function (done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: stock1 })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.property(res.body.stockData, 'stock');
                assert.property(res.body.stockData, 'price');
                assert.property(res.body.stockData, 'likes');
                assert.equal(res.body.stockData.stock, stock1);
                done();
            });
    });

    test('Viewing one stock and liking it: GET request to /api/stock-prices/', function (done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: stock1, like: true })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.property(res.body.stockData, 'likes');
                assert.isAbove(res.body.stockData.likes, 0);
                done();
            });
    });

    test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function (done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock1, like: true })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.property(res.body.stockData, 'likes');
                assert.isAbove(res.body.stockData.likes, 0);
                done();
            });
    });

    test('Viewing two stocks: GET request to /api/stock-prices/', function (done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: [stock1, stock2] })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.isArray(res.body.stockData);
                assert.equal(res.body.stockData.length, 2);
                assert.property(res.body.stockData[0], 'stock');
                assert.property(res.body.stockData[0], 'price');
                assert.property(res.body.stockData[0], 'rel_likes');
                assert.property(res.body.stockData[1], 'stock');
                assert.property(res.body.stockData[1], 'price');
                assert.property(res.body.stockData[1], 'rel_likes');
                done();
            });
    });

    test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function (done) {
        chai.request(server)
            .get('/api/stock-prices')
            .query({ stock: [stock1, stock2], like: true })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.property(res.body, 'stockData');
                assert.isArray(res.body.stockData);
                assert.equal(res.body.stockData.length, 2);
                assert.property(res.body.stockData[0], 'rel_likes');
                assert.property(res.body.stockData[1], 'rel_likes');
                done();
            });
    });
});
