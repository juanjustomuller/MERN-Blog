const {Router} = require('express')

const router = Router()

router.get('/', (req, res, next) => {
    res.json('Ruta post')
})

module.exports = router