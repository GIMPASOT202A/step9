const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
    {
      title: 'Sample book title here',
      genre: 'Historical fiction',
      author: 'Kwame Oppong',
      read: false,
    },
    {
      title: 'Sample book title here',
      genre: 'Historical fiction',
      author: 'Kwame Oppong',
      read: false,
    },
    {
      title: 'Sample book title here',
      genre: 'Historical fiction',
      author: 'Kwame Oppong',
      read: false,
    },
    {
      title: 'Sample book title here',
      genre: 'Historical fiction',
      author: 'Kwame Oppong',
      read: false,
    },
  ];
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset,
          },
        );
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        // eslint-disable-next-line operator-linebreak
        const { recordset } =
          // eslint-disable-next-line no-undef
          await request.input('id', sql.Int, id)
            .query('select * from books where Id = @id');
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: recordset[0],
          },
        );
      }());
    });
  return bookRouter;
}
module.exports = router;
