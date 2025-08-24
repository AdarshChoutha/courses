'use strict';

const crypto = require('crypto');

function hashIP(ip) {
  const SALT = 'ip-secret-salt';
  return crypto
    .createHash("sha256")
    .update(ip + SALT)
    .digest("hex");
}


const stocks = {};

const ip_likes = {};

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res) {

      const ip = req.ip || req.connection.remoteAddress;
      const ipHash = hashIP(ip);

      if (!ip_likes.hasOwnProperty(ipHash)) {
        ip_likes[ipHash] = {};
      }

      const isSingle = !Array.isArray(req.query?.stock);
      const stock_names = !Array.isArray(req.query?.stock) ? [req.query?.stock] : req.query?.stock;
      const is_liked = req.query?.like === 'true';

      const stockData = stock_names.map(stock_name => {
        if (!stocks.hasOwnProperty(stock_name)) {
          stocks[stock_name] = {
            stock: stock_name,
            price: +(Math.random() * 99).toFixed(2) + 1,
            likes: 0
          }
        }

        if (!ip_likes[ipHash].hasOwnProperty(stock_name)) {
          stocks[stock_name].likes = stocks[stock_name].likes + is_liked;
        } else {
          const ip_liked = ip_likes[ipHash][stock_name];
          if (ip_liked !== is_liked) {
            stocks[stock_name].likes = stocks[stock_name].likes + (ip_liked ? -1 : 1);
          }
        }
        ip_likes[ipHash][stock_name] = is_liked;

        const stock = {
          stock: stock_name, price: stocks[stock_name].price,
          [!isSingle ? 'rel_likes' : 'likes']: stocks[stock_name].likes
        }

        return stock;
      });

      if (!isSingle) {
        stockData[0].rel_likes = stockData[0].rel_likes - stockData[1].rel_likes;
        stockData[1].rel_likes = -stockData[0].rel_likes;
      }

      return res.status(200).send({ stockData: !isSingle ? stockData : stockData[0] });
    });

};
