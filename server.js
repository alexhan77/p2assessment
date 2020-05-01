const express = require('express');
const methodOverride = require('method-override');
const app = express();
const db = require('./models')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('home', { widgets })
    })
    .catch(err => {
        console.log('Error')
        res.send('uh oh!')
    })
})

app.post('/', (req, res) => {
    db.widget.create(req.body)
    .then(newWid => {
        res.redirect('/')
    })
    .catch(err => {
        console.log('Error:', err)
        res.send('Uh oh!')
    })
})

app.delete('/:id', (req, res)=> {
    db.widget.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err=> {
        console.log('Error in delete', err)
        res.render('error')
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
