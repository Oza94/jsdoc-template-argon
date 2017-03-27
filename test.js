const data = require('./fixtures/test.json');
const opts = require('./fixtures/test-opts.json');
const taffy = require('taffydb').taffy;
const db = taffy(data);

require('./publish').publish(db, opts);
