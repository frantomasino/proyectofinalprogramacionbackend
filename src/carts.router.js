const express = require('express');
const CartManager = require('../services/CartManager');
const router = express.Router();

const cartManager = new CartManager('./data/carrito.json');

 router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

 router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

 router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager.addProductToCart(cid, pid);
        if (!updatedCart) {
            return res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

module.exports = router;
